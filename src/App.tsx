import React, { useState } from "react";
import { ChatRoom } from "./components/ChatRoom";
import "./App.css";

export const App: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [wantCreate, setWantCreate] = useState(false);
  const [profilePicFile, setProfilePicFile] = React.useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = React.useState<string>("");

  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }
  const [profilePicBase64, setProfilePicBase64] = React.useState<string>("");

  const handleJoin = async () => {
    if (profilePicFile) {
      const base64 = await fileToDataUrl(profilePicFile);
      setProfilePicBase64(base64);
    }
    // proceed to setJoined(true) etc.
  };

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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setProfilePicFile(file);
                setProfilePicPreview(URL.createObjectURL(file));
                // preview locally
              }
            }}
          />

          {/* Optional: show preview */}
          {profilePicPreview && (
            <img
              src={profilePicPreview}
              alt="Profile preview"
              className="w-16 h-16 rounded-full object-cover mt-2"
            />
          )}
          <button
            className="App-button"
            onClick={async () => {
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

              await handleJoin(); // <-- make sure profilePicBase64 is set before proceeding
              setJoined(true); // only after profile pic is ready
            }}
          >
            {roomId.trim() ? "Join Room" : "Create Room"}
          </button>
        </div>
      ) : (
        <ChatRoom
          nickname={nickname}
          roomId={roomId}
          wantCreate={wantCreate}
          profilePic={profilePicBase64}
        />
      )}
    </div>
  );
};
