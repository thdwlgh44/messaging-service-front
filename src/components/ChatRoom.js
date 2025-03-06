import { useParams } from "react-router-dom";
import useChat from "../hooks/useChat";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "../styles/ChatRoom.css";

const ChatRoom = () => {
  const { roomId } = useParams();
  const user = sessionStorage.getItem("chatUser") || "익명 사용자";
  const recipient = sessionStorage.getItem("chatRecipient") || "대화 상대 없음"; // 🔥 recipient 설정

  const { messages, sendMessage } = useChat(roomId, user, recipient);

  return (
    <div className="chat-room">
      <div className="chat-header">
        {roomId} - {recipient}와 채팅 중
      </div>
      <MessageList messages={messages} user={user} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
