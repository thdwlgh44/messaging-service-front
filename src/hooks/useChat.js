import { useEffect, useState } from "react";
import { useChatClient } from "../context/ChatContext";

const useChat = (roomId, user, recipient) => {
  const client = useChatClient();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!client || !client.connected) return;

    console.log(`✅ WebSocket Connected to room: ${roomId}`);

    const subscription = client.subscribe(
      //메시지 수신
      `/topic/chatroom-${roomId}`,
      (message) => {
        const parsedMessage = JSON.parse(message.body);
        console.log("📥 수신된 메시지:", parsedMessage);
        setMessages((prev) => [...prev, parsedMessage]); // ✅ 받은 메시지를 상태에 저장
      }
    );

    return () => {
      subscription.unsubscribe();
      console.log(`🔴 WebSocket Disconnected from room: ${roomId}`);
    };
  }, [client, roomId]);

  const sendMessage = (content) => {
    console.log("🛠 sendMessage() 호출됨");
    if (client && client.connected) {
      console.log("✅ WebSocket 상태:", client);
      const message = { sender: user, recipient, content, chatRoomId: roomId };
      client.publish({
        //메시지 전송
        destination: "/app/send",
        body: JSON.stringify(message),
      });
      console.log("📨 메시지 전송:", message);
    } else {
      console.error("❌ WebSocket 연결 실패");
    }
  };

  return { messages, sendMessage };
};

export default useChat;
