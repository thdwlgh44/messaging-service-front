import { useNavigate } from "react-router-dom";
import "../styles/ChatList.css";
import Logout from "./Logout";

const ChatList = ({ setToken }) => {
  const navigate = useNavigate();
  const chatRooms = ["room1", "room2", "room3", "room4", "room5", "room6"];
  const username = sessionStorage.getItem("chatUser") || "사용자";

  return (
    <div className="chat-list">
      <h2>채팅방 목록</h2>

      {/* ✅ 로그인한 사용자명 + 로그아웃 버튼 */}
      <div className="user-info">
        <span className="username">{username} 님이 로그인 하셨습니다</span>
        <Logout setToken={setToken} />
      </div>

      <div className="chat-rooms">
        {chatRooms.map((room) => (
          <div key={room} onClick={() => navigate(`/chat/${room}`)}>
            🗨️ {room}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
