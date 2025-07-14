const {Router} = require("express");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const {getRecommendedUsers,getMyFriends,sendFriendRequest,acceptFriendRequest,rejectFriendRequest,getFriendRequests,getOutgoingFriendReqs} = require("../controllers/userController");


const router = Router();

router.use(isLoggedIn);

router.get('/',getRecommendedUsers);
router.get('/friends', getMyFriends);
router.post('/friend-request/:id', sendFriendRequest);
router.put('/friend-request/:id/accept', acceptFriendRequest);
router.put('/friend-request/:id/reject', rejectFriendRequest);
router.get('/friend-requests', getFriendRequests);

router.get('/outgoing-friend-requests', getOutgoingFriendReqs);



module.exports = router;