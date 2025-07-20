const User = require("../models/userModel");
const FriendRequest = require("../models/friendRequestModel");
const asyncHandler = require("../utils/asyncHandler");

module.exports.getRecommendedUsers = asyncHandler(async (req, res) => {
  // console.log("recommended users endpoint hit");
  const currentUser = req.user;
  const recommendedUsers = await User.find({
    $and: [
      { _id: { $ne: currentUser._id } }, // Exclude current user
      { _id: { $nin: currentUser.friends } }, // Exclude already friends
      { isOnboarded: true }, // Only include users who are onboarded
    ],
  });
  res.status(200).json({
    success: true,
    recommendedUsers,
  });
});

module.exports.getMyFriends = asyncHandler(async (req, res) => {
  console.log("getMyFriends endpoint hit");
  console.log(req.user.id);
  const user = await User.findById(req.user.id).select("friends").populate({
    path: "friends",
    select: "name bio profilePic nativeLanguage learningLanguage location",
  });
  // console.log(user);
  console.log(user.friends);
  if (!user) {
    throw new Error("User not found");
  }
  res.status(200).json({
    success: true,
    friends: user.friends,
  });
});

module.exports.sendFriendRequest = asyncHandler(async (req, res) => {
  const myId = req.user.id;
  const { id: recipientId } = req.params;
  if (myId === recipientId) {
    throw new Error("You cannot send a friend request to yourself");
  }
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    throw new Error("Recipient not found");
  }
  if (recipient.friends.includes(myId)) {
    throw new Error("You are already friends with this user");
  }
  const existingRequest = await FriendRequest.findOne({
    $or: [
      { sender: myId, recipient: recipientId },
      { sender: recipientId, recipient: myId },
    ],
  });
  if (existingRequest) {
    throw new Error("Friend request already exists");
  }
  const friendRequest = await FriendRequest.create({
    sender: myId,
    recipient: recipientId,
  });

  res.status(200).json({
    success: true,
    message: "Friend request sent successfully",
  });
});

module.exports.acceptFriendRequest = asyncHandler(async (req, res) => {
  const { id: requestId } = req.params;
  const friendRequest = await FriendRequest.findById(requestId);
  if (!friendRequest) {
    throw new Error("Friend request not found");
  }

  //verify if the current user is the recipient of the request
  if (friendRequest.recipient.toString() !== req.user.id) {
    throw new Error("You are not authorized to accept this friend request");
  }
  if (friendRequest.status === "accepted") {
    throw new Error("You are already friends");
  }
  friendRequest.status = "accepted";
  await friendRequest.save();
  // Add both users to each other's friends list
  await User.findByIdAndUpdate(friendRequest.sender, {
    $addToSet: { friends: friendRequest.recipient },
  });
  await User.findByIdAndUpdate(friendRequest.recipient, {
    $addToSet: { friends: friendRequest.sender },
  });

  res.status(200).json({
    success: true,
    message: "Friend request accepted successfully",
  });
});

module.exports.rejectFriendRequest = asyncHandler(async (req, res) => {
  const { id: requestId } = req.params;
  const friendRequest = await FriendRequest.findById(requestId);
  if (!friendRequest) {
    throw new Error("Friend request not found");
  }

  //verify if the current user is the recipient of the request
  if (friendRequest.recipient.toString() !== req.user.id) {
    throw new Error("You are not authorized to reject this friend request");
  }
  friendRequest.status = "rejected";
  await friendRequest.save();

  res.status(200).json({
    success: true,
    message: "Friend request rejected successfully",
  });
});
module.exports.getFriendRequests = asyncHandler(async (req, res) => {
  console.log("getFriendRequests endpoint hit");
  // Fetch incoming friend requests for the current user
  const incomingReqs = await FriendRequest.find({
    recipient: req.user.id,
    status: "pending",
  }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

  const acceptedReqs = await FriendRequest.find({
    sender: req.user.id,
    status: "accepted",
  }).populate("recipient", "fullName profilePic");

  res.status(200).json({ incomingReqs, acceptedReqs });
});

module.exports.getOutgoingFriendReqs = asyncHandler(async (req, res) => {
  const outgoingRequests = await FriendRequest.find({
    sender: req.user.id,
    status: "pending",
  }).populate(
    "recipient",
    "fullName profilePic nativeLanguage learningLanguage"
  );

  res.status(200).json(outgoingRequests);
});
