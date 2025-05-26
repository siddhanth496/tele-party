import React from "react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { useTeleparty } from "../hooks/useTeleparty";
import "./ChatRoom.css";

interface Props {
  nickname: string;
  roomId: string;
  wantCreate: boolean;
  profilePic?: string;
}

export const ChatRoom: React.FC<Props> = ({
  nickname,
  roomId,
  wantCreate,
  profilePic,
}) => {
  const {
    ready,
    roomId: resolvedRoomId,
    messages,
    anyoneTyping,
    sendMessage,
    sendTyping,
  } = useTeleparty(nickname, roomId, wantCreate);

  if (!ready) return <div className="ChatRoom-loading">Connecting…</div>;
  console.log(profilePic, "debug");

  return (
    <div className="ChatRoom">
      <header className="ChatRoom-header">
        <h2 className="ChatRoom-title">
          Room: {resolvedRoomId} — You: {nickname}
        </h2>
        {profilePic && (
          <img
            src={profilePic}
            alt=""
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        )}
      </header>
      <MessageList messages={messages} />
      {anyoneTyping && (
        <div className="TypingIndicator">Someone is typing…</div>
      )}
      <ChatInput onSend={sendMessage} onTyping={sendTyping} />
    </div>
  );
};
