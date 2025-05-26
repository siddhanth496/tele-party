import React, { useState } from "react";
import { ChatRoom } from "./components/ChatRoom";
import "./App.css";

export const App: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [wantCreate, setWantCreate] = useState(false);

  return (
    <div className="App-container">
      {!joined ? (
        <div className="App-form">
          <h1 className="App-title">Teleparty Chat</h1>

          <input
            className="App-input"
            placeholder="Your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <input
            className="App-input"
            placeholder="Room ID to join (leave blank to create)"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />

          <button
            className="App-button"
            onClick={() => {
              if (!nickname.trim()) {
                alert("Enter a nickname");
                return;
              }
              const isCreating = !roomId.trim();
              const id = isCreating
                ? Math.random().toString(36).substr(2, 6)
                : roomId.trim();

              setWantCreate(isCreating);
              setRoomId(id);
              setJoined(true);
            }}
          >
            {roomId.trim() ? "Join Room" : "Create Room"}
          </button>
        </div>
      ) : (
        <ChatRoom nickname={nickname} roomId={roomId} wantCreate={wantCreate} />
      )}
    </div>
  );
};
