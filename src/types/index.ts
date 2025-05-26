export interface SendMessageData {
  body: string;
}

export interface SessionChatMessage {
  isSystemMessage: boolean;
  userIcon?: string;
  userNickname?: string;
  body: string;
  permId: string;
  timestamp: number;
}

// New interfaces for typing presence
export interface SetTypingMessageData {
  typing: boolean;
}

export interface TypingMessageData {
  anyoneTyping: boolean;
  usersTyping: string[];
}
