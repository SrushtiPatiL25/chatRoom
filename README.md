### ChatRoom 

# 💬 Real-Time Chat Application

A scalable **real-time chat application** built using **Node.js and Socket.IO**, enabling seamless communication between multiple users across different chat rooms. The application is designed with a focus on real-time interactions, clean architecture, and an enhanced user experience.

---

## 🚀 Features

### ✅ Core Features
- **Multiple Chat Rooms**  
  Users can join any available room and start chatting instantly.

- **Real-Time Messaging**  
  Messages are delivered instantly to all users in the same room using WebSockets.

- **Join / Leave Notifications**  
  Users are notified when someone joins or leaves the chat room.

- **Active Users List**  
  Displays a real-time list of users currently present in a room.

---

### 🔥 Enhanced Features
- **Typing Indicator**  
  Shows when a user is typing in the chat room.

- **Online / Offline Status**  
  Tracks and displays user presence in real time.

- **Auto-Scroll to Latest Message**  
  Automatically scrolls the chat window to the newest message.

- **Authentication (JWT)**  
  Secure user authentication and session management using JSON Web Tokens.

- **AI Chat Moderator**  
  AI-powered moderation to detect and handle inappropriate or abusive messages.

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **Socket.IO** – Real-time bi-directional communication

### Frontend
- **React.js**
- **React Router**
- **Socket.IO Client**
- **CSS**

---

## ⚙️ How It Works

1. User joins a chat room by selecting a username and room.
2. Socket connection is established with the server.
3. Messages are exchanged in real time within the selected room.
4. Server broadcasts join/leave events and updates room user lists.
5. Client listens to socket events and updates the UI accordingly.

---

## 📌 Future Improvements
- Message persistence using a database
- Private 1-to-1 chats
- File and image sharing
- Message read receipts
- Deployment with Docker & CI/CD pipeline

---

## 👨‍💻 Author
**Srushti Patil**  
Frontend Developer




