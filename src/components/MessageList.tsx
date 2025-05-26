import React from "react";
import { SessionChatMessage } from "../types";
import "./MessageList.css";

interface Props {
  messages: SessionChatMessage[];
}

export const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <div className="MessageList">
      {messages.map((msg) => (
        <div
          key={msg.permId}
          className={[
            "MessageList-item",
            msg.isSystemMessage
              ? "MessageList-item--system"
              : "MessageList-item--user",
          ].join(" ")}
        >
          {
            <div
              style={!msg.isSystemMessage ? {} : { alignSelf: "center" }}
              className="MessageList-nickname"
            >
              {msg.userNickname}
            </div>
          }
          <div
            className={
              msg.isSystemMessage
                ? "MessageList-bubble-header"
                : "MessageList-bubble"
            }
          >
            {msg.body}
          </div>
          {!msg.isSystemMessage && (
            <div className="MessageList-timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
