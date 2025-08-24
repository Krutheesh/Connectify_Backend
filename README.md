# 🌐 Connectify Backend – Language Learning Application

**Connectify Backend** powers the Connectify application, providing APIs for authentication, real-time chat, video calls, friend requests, and user management.  
It is built with **Node.js, Express.js, and MongoDB**, integrated with **Streamify** for real-time communication.  

🚀 **Frontend Live URL:** [Connectify Frontend (Vercel)](https://connectify-frontend-sigma.vercel.app/login)  
📂 **Frontend Repository:** [GitHub Repo](https://github.com/Krutheesh/Connectify_Frontend)  

🚀 **Backend Live API:** [Connectify Backend (Vercel)](https://connectify-backend-wheat.vercel.app/)  
📂 **Backend Repository:** [GitHub Repo](https://github.com/Krutheesh/Connectify_Backend)  

---

## ✨ Features

- 🔐 **Authentication & Authorization** – Signup, login, and JWT-based secure sessions  
- 🤝 **Friend Requests** – APIs for sending, accepting, and managing friend requests  
- 💬 **Real-time Chat** – Powered by **Streamify**  
- 📹 **Video Calling** – One-to-one calls for language practice  
- 🗄️ **Database** – MongoDB schema for users, messages, and friends  
- ⚡ **API Endpoints** – Well-structured REST APIs for frontend integration  

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- Streamify (real-time video & chat)  
- JWT for authentication  

---

## 🚀 Backend Setup

Follow these steps to set up and run the backend locally:

## 1️⃣ Clone the backend repository

git clone https://github.com/Krutheesh/Connectify_Backend.git
## 2️⃣ Go into the project directory

cd Connectify_Backend

## 3️⃣ Install dependencies
npm install

## 4️⃣ Set up environment variables

PORT=5000
MONGO_URI=your_mongodb_connection_string
STREAMIFY_KEY=your_streamify_api_key
JWT_SECRET=your_jwt_secret

## 5️⃣ Start the backend server
npm run dev   # or node index.js depending on your setup

## 6️⃣ Test the backend API
http://localhost:5000/


## 7️⃣ Integrate with frontend
VITE_BACKEND_URL=http://localhost:5000


