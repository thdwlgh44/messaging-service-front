import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/chat"); // Spring Boot WebSocket end-point와 연결
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => console.log("✅ WebSocket Connected"),
    });

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, []);

  return <ChatContext.Provider value={client}>{children}</ChatContext.Provider>;
};

export const useChatClient = () => useContext(ChatContext);
export default ChatProvider;
