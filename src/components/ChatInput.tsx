import React, { useState, FormEvent, useEffect } from "react";
import "./ChatInput.css";

interface Props {
  onSend: (body: string) => void;
  onTyping: (typing: boolean) => void;
}

export const ChatInput: React.FC<Props> = ({ onSend, onTyping }) => {
  const [text, setText] = useState("");

  // Notify typing status
  useEffect(() => {
    if (text) {
      onTyping(true);
      const timeout = setTimeout(() => onTyping(false), 1000);
      return () => clearTimeout(timeout);
    }
    onTyping(false);
  }, [text, onTyping]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form className="ChatInput-form" onSubmit={submit}>
      <input
        className="ChatInput-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message…"
      />
      <button type="submit" className="ChatInput-button">
        Send
      </button>
    </form>
  );
};
