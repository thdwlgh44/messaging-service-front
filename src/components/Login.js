import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // ✅ CSS 추가

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json().catch(() => null); // ✅ JSON 파싱 오류 방지
      console.log("🔹 서버 응답:", data); // ✅ JWT 응답 확인

      if (response.ok) {
        console.log("✅ JWT 토큰 저장:", data.token);
        sessionStorage.setItem("token", data.token); // ✅ JWT 저장
        sessionStorage.setItem("chatUser", username); // ✅ 사용자명 저장
        setToken(data.token); // ✅ 상태 업데이트
        navigate("/chat"); // ✅ 로그인 성공 시 채팅방 목록으로 이동
      } else {
        // ✅ JSON 응답에 error 필드가 있는 경우 처리
        alert(data?.error || "로그인 실패");
      }
    } catch (error) {
      console.error("❌ 로그인 요청 중 오류 발생:", error);
      alert("서버와 통신할 수 없습니다.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Chat App 로그인</h2>
        <input
          type="text"
          placeholder="사용자 이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleLogin}>로그인</button>
        <p className="signup-text">
          계정이 없으신가요?{" "}
          <span onClick={() => navigate("/auth/signup")}>회원가입</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
