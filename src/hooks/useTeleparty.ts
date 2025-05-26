import { useEffect, useState, useRef, useCallback } from "react";
import {
  TelepartyClient,
  SocketEventHandler,
  SocketMessageTypes,
} from "teleparty-websocket-lib";
import {
  SendMessageData,
  SessionChatMessage,
  SetTypingMessageData,
  TypingMessageData,
} from "../types";

export function useTeleparty(
  nickname: string,
  roomId: string,
  wantCreate: boolean
) {
  const [ready, setReady] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SessionChatMessage[]>([]);
  const [anyoneTyping, setAnyoneTyping] = useState(false);
  const clientRef = useRef<TelepartyClient | null>(null);

  useEffect(() => {
    const handler: SocketEventHandler = {
      onConnectionReady: () => setReady(true),
      onClose: () => alert("Connection closed. Please reload."),
      onMessage: ({ type, data }) => {
        if (type === SocketMessageTypes.SEND_MESSAGE) {
          setMessages((msgs) => [...msgs, data as SessionChatMessage]);
        } else if (type === SocketMessageTypes.SET_TYPING_PRESENCE) {
          const d = data as TypingMessageData;
          setAnyoneTyping(d.anyoneTyping);
        }
      },
    };

    const client = new TelepartyClient(handler);
    clientRef.current = client;

    return () => {
      // cleanup if supported
    };
  }, []);

  useEffect(() => {
    if (!ready || !clientRef.current) return;
    (async () => {
      const client = clientRef.current!;
      let sessionId: string;
      try {
        if (wantCreate) {
          sessionId = await client.createChatRoom(nickname);
        } else {
          sessionId = roomId;
          await client.joinChatRoom(nickname, sessionId);
        }
        setActiveRoomId(sessionId);
      } catch (err: any) {
        alert(`Error: ${err.message || err}`);
      }
    })();
  }, [ready, nickname, roomId, wantCreate]);

  const sendMessage = useCallback(
    (body: string) => {
      if (!activeRoomId) return;
      clientRef.current?.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body,
      } as SendMessageData);
    },
    [activeRoomId]
  );

  const sendTyping = useCallback(
    (typing: boolean) => {
      if (!activeRoomId) return;
      clientRef.current?.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
        typing,
      } as SetTypingMessageData);
    },
    [activeRoomId]
  );

  return {
    ready,
    roomId: activeRoomId,
    messages,
    anyoneTyping,
    sendMessage,
    sendTyping,
  };
}
