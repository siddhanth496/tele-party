import React from "react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { useTeleparty } from "../hooks/useTeleparty";
import "./ChatRoom.css";

interface Props {
  nickname: string;
  roomId: string;
  wantCreate: boolean;
}

export const ChatRoom: React.FC<Props> = ({ nickname, roomId, wantCreate }) => {
  const {
    ready,
    roomId: resolvedRoomId,
    messages,
    anyoneTyping,
    sendMessage,
    sendTyping,
  } = useTeleparty(nickname, roomId, wantCreate);

  if (!ready) return <div className="ChatRoom-loading">Connecting…</div>;

  return (
    <div className="ChatRoom">
      <header className="ChatRoom-header">
        <h2 className="ChatRoom-title">
          Room: {resolvedRoomId} — You: {nickname}
        </h2>
      </header>
      <MessageList messages={messages} />
      {anyoneTyping && (
        <div className="TypingIndicator">Someone is typing…</div>
      )}
      <ChatInput onSend={sendMessage} onTyping={sendTyping} />
    </div>
  );
};
