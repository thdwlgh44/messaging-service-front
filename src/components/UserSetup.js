import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSetup = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (username.trim()) {
      localStorage.setItem("chatUser", username);
      navigate("/chat/room1"); // 기본 채팅방으로 이동
    }
  };

  return (
    <div className="user-setup">
      <h2>사용자 이름 입력</h2>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSave}>입장</button>
    </div>
  );
};

export default UserSetup;
