import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // ✅ 로그인 페이지와 동일한 스타일 적용

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }

    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("✅ 회원가입 성공! 이제 로그인해주세요.");
      navigate("/auth/login"); // ✅ 회원가입 후 로그인 페이지로 이동
    } else {
      alert("❌ 회원가입 실패: " + (await response.text()));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>회원가입</h2>
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
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSignup}>회원가입</button>
        <p className="signup-text">
          이미 계정이 있으신가요?{" "}
          <span onClick={() => navigate("/auth/login")}>로그인</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
