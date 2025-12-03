# Team Chat Application — Real-Time Communication Platform

A full-stack chat application built to enable fast and secure conversations within channels.
Users can join multiple channels, view chat history, and communicate in real-time with presence updates.

## Features
Feature	Description
1. Secure Login & Signup	JWT authentication + protected APIs
2. Create & View Channels	Join any channel instantly
3. Real-Time Messaging	Socket.IO powered instant messages
4. Online Users Indicator	Presence system with green dot
5. Chat History Storage	MongoDB message persistence
6. Pagination	“Load Older” to fetch older messages
7. Typing Indicator	Shows active typing in real-time
8. Tailwind CSS UI	Clean and responsive interface
## Tech Stack Used
Layer	Technology
Frontend	React, Vite, TailwindCSS, Socket.IO-Client, Axios
Backend	Node.js, Express.js, MongoDB, Mongoose, Socket.IO
Authentication	JWT + bcrypt
Data Transmission	REST API + WebSockets
## Project Architecture
chat-app-complete/
 ├── server/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── socket.js
 │   └── index.js
 ├── client/
 │   ├── src/
 │   │   ├── components/
 │   │   ├── pages/
 │   │   ├── App.jsx
 │   │   └── index.css
 └── README.md

⚙️ Installation & Setup
1️⃣ Clone the Project
git clone <your-github-repo-url>
cd chat-app-complete

2️⃣ Backend Setup
cd server
npm install
cp .env.example .env


🔹 Update .env with:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key


Run backend:

npm run dev


Server will start on:
👉 http://localhost:4000

3️⃣ Frontend Setup
cd ../client
npm install
npm run dev


Frontend will start on:
👉 http://localhost:5173

🧪 How It Works

1️⃣ Sign Up and Login
2️⃣ Create a Channel or Select Existing One
3️⃣ Send and Receive Messages in Real-Time
4️⃣ Online users shown with green dot
5️⃣ Scroll up → Load older messages
6️⃣ Typing indicator visible when user types

## Learning Outcomes

Real-time application development

Authentication system & token security

Socket room-based communication

REST API architecture

UI/UX with reusable components

MongoDB data modeling

🔮 Future Improvements

Direct personal chats (DM)

File sharing

Message reactions & replies

Group avatars & user profile

Notification system

## Developed By

Ravikant Rathod
Full-Stack Developer

“This project is built as part of a full-stack internship assignment focusing on real-time communication systems.”

## Final Note

This project fulfills all assignment requirements:

✔ Channel list
✔ Entering channel
✔ Chat history
✔ Sending messages
✔ Who is online
✔ Clean functional interface
