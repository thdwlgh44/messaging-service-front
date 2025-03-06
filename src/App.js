import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ChatProvider from "./context/ChatContext";
import ChatList from "./components/ChatList";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login"; // ✅ 로그인 페이지 추가
import Signup from "./components/Signup"; // ✅ 회원가입 페이지 추가
import "./styles/App.css";

function App() {
  // ✅ sessionStorage에서 JWT 토큰과 사용자 이름 확인
  const [token, setToken] = useState(() => sessionStorage.getItem("token")); // ✅ 초기값 설정
  const [isTokenChecked, setIsTokenChecked] = useState(false); // ✅ 중복 실행 방지

  // ✅ 로그인 상태 변경 감지 (useEffect 추가)
  useEffect(() => {
    if (!isTokenChecked) {
      setToken(sessionStorage.getItem("token"));
      setIsTokenChecked(true);
    }
  }, [isTokenChecked]); // ✅ 초기 1회 실행 후 다시 실행되지 않도록 설정

  return (
    <ChatProvider>
      <Router>
        <div className="app-container">
          {/* ✅ 1. 로그인되지 않은 경우 로그인 페이지로 이동 */}
          {!token ? (
            <Routes>
              <Route
                path="/auth/login"
                element={<Login setToken={setToken} />}
              />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
          ) : (
            <>
              {/* ✅ 3. 로그인된 경우 메인 채팅 페이지 표시 */}
              <ChatList setToken={setToken} />
              <div className="chat-container">
                <Routes>
                  <Route path="/chat/:roomId" element={<ChatRoom />} />
                  <Route path="/" element={<Navigate to="/chat" replace />} />

                  {/* ✅ 로그인된 경우 로그인 & 회원가입 페이지 접근 방지 */}
                  <Route
                    path="/auth/login"
                    element={<Navigate to="/chat" replace />}
                  />
                  <Route
                    path="/auth/signup"
                    element={<Navigate to="/chat" replace />}
                  />
                </Routes>
              </div>
            </>
          )}
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;
