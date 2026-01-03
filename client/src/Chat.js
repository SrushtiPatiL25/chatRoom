import { useEffect, useState, useRef } from "react";
import socket from "./socket";
import { useLocation, useNavigate } from "react-router-dom";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState("");
  const messageRef = useRef();
  const navigate = useNavigate();

  // Get username and room from URL
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const username = params.get("username");
  const roomName = params.get("room");

  useEffect(() => {
    socket.emit("joinroom", { username, room: roomName });

    const messageHandler = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const botMessageHandler = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const roomInfoHandler = ({ room, userList }) => {
      setRoom(room);
      setUsers(userList);
    };

    socket.on("message", messageHandler);
    socket.on("messageBot", botMessageHandler);
    socket.on("roomInfo", roomInfoHandler);

    return () => {
      socket.off("message", messageHandler);
      socket.off("messageBot", botMessageHandler);
      socket.off("roomInfo", roomInfoHandler);
    };
  }, [username, roomName]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageRef.current.value.trim()) return;

    socket.emit("userMessage", messageRef.current.value);
    messageRef.current.value = "";
  };

  const handleLeave = () => {
    navigate("/");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> ChatApp
        </h1>
        <button onClick={handleLeave} className="btn">
          Leave Room
        </button>
      </header>

      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>Room Name:</h3>
          <h2>{room}</h2>

          <h3>Users</h3>
          <ul>
            {users.map((u) => (
              <li key={u.id}>{u.username}</li>
            ))}
          </ul>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.username ? "message" : "message-bot"}
            >
              {msg.username && (
                <p className="meta">
                  {msg.username} <span>{msg.time}</span>
                </p>
              )}
              <p className="text">{msg.msg}</p>
            </div>
          ))}
        </div>
      </main>

      <div className="chat-form-container">
        <form onSubmit={sendMessage}>
          <input
            ref={messageRef}
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <button className="btn">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
