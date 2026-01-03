import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("General");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/chat?username=${username}&room=${room}`);
  };

  return (
    <div className="join-container">
      <header className="join-header">
        <h1><i className="fas fa-smile"></i> ChatApp</h1>
      </header>

      <main className="join-main">
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label>Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label>Room</label>
            <select value={room} onChange={(e) => setRoom(e.target.value)}>
              <option value="General">General</option>
              <option value="Study Room-1">Study Room-1</option>
              <option value="Study Room-2">Study Room-2</option>
              <option value="Music">Music</option>
              <option value="GameZone">GameZone</option>
              <option value="Random">Random</option>
            </select>
          </div>

          <button className="btn">Join Chat</button>
        </form>
      </main>
    </div>
  );
}

export default Join;
