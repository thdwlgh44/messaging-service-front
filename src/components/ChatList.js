import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ChatList.css";

const ChatList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatRooms = ["room1", "room2", "room3", "room4", "room5", "room6"];

  return (
    <div className="chat-list">
      <h2>채팅방 목록</h2>
      <div className="chat-rooms">
        {chatRooms.map((room) => (
          <div
            key={room}
            className={`chat-room ${location.pathname === `/chat/${room}` ? "active" : ""}`}
            onClick={() => navigate(`/chat/${room}`)}
          >
            🗨️ {room}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
