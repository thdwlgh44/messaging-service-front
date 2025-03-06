import { useEffect, useState, useRef } from "react";
import { useChatClient } from "../context/ChatContext";

const useChat = (roomId, user, recipient, setRecipient) => {
  const client = useChatClient();
  const [messages, setMessages] = useState([]);
  const isSubscribed = useRef(false);

  useEffect(() => {
    if (!client || !client.connected || isSubscribed.current) return;

    console.log(`✅ WebSocket Connected to room: ${roomId}`);
    isSubscribed.current = true;

    // ✅ 메시지 구독
    const messageSubscription = client.subscribe(
      `/topic/chatroom-${roomId}`,
      (message) => {
        const parsedMessage = JSON.parse(message.body);
        console.log("📥 수신된 메시지:", parsedMessage);
        setMessages((prev) => [...prev, parsedMessage]);
      }
    );

    // ✅ 사용자 업데이트 감지 → recipient 갱신
    const updateSubscription = client.subscribe(
      `/topic/chatroom-${roomId}/updateUsers`,
      () => {
        console.log("🔄 WebSocket 사용자 업데이트 감지, recipient 갱신 요청");
        fetch(`http://localhost:8080/chat/recipient/${roomId}/${user}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.recipient && data.recipient !== "") {
              console.log("🔄 recipient 업데이트됨:", data.recipient);
              setRecipient(data.recipient);
              sessionStorage.setItem("chatRecipient", data.recipient);
            }
          })
          .catch((err) => console.error("❌ recipient 업데이트 실패:", err));
      }
    );

    return () => {
      if (messageSubscription) {
        messageSubscription.unsubscribe();
        console.log(`🔴 WebSocket 메시지 구독 해제: ${roomId}`);
      }
      if (updateSubscription) {
        updateSubscription.unsubscribe();
        console.log(`🔴 WebSocket 업데이트 구독 해제: ${roomId}`);
      }
      isSubscribed.current = false;
    };
  }, [client, roomId, user, setRecipient]); // ✅ setRecipient 포함

  const sendMessage = (content) => {
    if (!recipient || recipient === "대화 상대 없음") {
      console.error("❌ recipient가 설정되지 않아 메시지 전송 실패");
      alert("대화 상대를 찾을 수 없습니다. 다시 시도해주세요.");
      return;
    }

    if (client && client.connected) {
      const message = {
        sender: user,
        recipient,
        content,
        chatRoomId: roomId,
      };
      client.publish({
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
