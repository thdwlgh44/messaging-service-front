import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import useChat from "../hooks/useChat";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "../styles/ChatRoom.css";

const ChatRoom = () => {
  const { roomId } = useParams();
  const user = sessionStorage.getItem("chatUser") || "익명 사용자";
  const [recipient, setRecipient] = useState("");

  // ✅ 서버에서 recipient 가져오는 함수
  const fetchRecipient = useCallback(() => {
    fetch(`http://localhost:8080/chat/recipient/${roomId}/${user}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.recipient && data.recipient !== "") {
          console.log("✅ 서버에서 받은 recipient:", data.recipient);
          setRecipient(data.recipient);
          sessionStorage.setItem("chatRecipient", data.recipient);
        }
      })
      .catch((err) => console.error("❌ recipient 가져오기 실패:", err));
  }, [roomId, user]);

  // ✅ 채팅방 입장 API 호출
  useEffect(() => {
    fetch("http://localhost:8080/chat/enter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatRoomId: roomId, username: user }),
    })
      .then(() => {
        console.log("✅ 채팅방 입장 완료");
        fetchRecipient();
      })
      .catch((err) => console.error("❌ 채팅방 입장 실패:", err));

    return () => {
      fetch("http://localhost:8080/chat/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatRoomId: roomId, username: user }),
      })
        .then(() => console.log("❌ 채팅방 퇴장 완료"))
        .catch((err) => console.error("❌ 채팅방 퇴장 실패:", err));
    };
  }, [roomId, user, fetchRecipient]);

  const { messages, sendMessage } = useChat(
    roomId,
    user,
    recipient,
    setRecipient
  );

  return (
    <div className="chat-room">
      <div className="chat-header">
        {roomId} - {recipient ? `${recipient}님과 채팅 중` : "대화 상대 없음"}
      </div>
      <MessageList messages={messages} user={user} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
