import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ChatProvider from "./context/ChatContext";
import ChatList from "./components/ChatList";
import ChatRoom from "./components/ChatRoom";
import UserSetup from "./components/UserSetup";
import Login from "./components/Login"; // ✅ 로그인 페이지 추가
import Signup from "./components/Signup"; // ✅ 회원가입 페이지 추가
import "./styles/App.css";

function App() {
  // ✅ localStorage에서 JWT 토큰과 사용자 이름 확인
  const [token, setToken] = useState(localStorage.getItem("token"));
  const username = localStorage.getItem("chatUser");

  return (
    <ChatProvider>
      <Router>
        <div className="app-container">
          {/* ✅ 로그인되지 않은 경우 로그인 페이지로 이동 */}
          {!token ? (
            <Routes>
              <Route
                path="/auth/login"
                element={<Login setToken={setToken} />}
              />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
          ) : !username ? ( // ✅ 로그인했지만 사용자명이 없으면 UserSetup으로 이동
            <Routes>
              <Route path="/setup" element={<UserSetup />} />
              <Route path="*" element={<Navigate to="/setup" replace />} />
            </Routes>
          ) : (
            <>
              {/* 사이드바 (채팅방 목록) */}
              <ChatList />

              {/* 메인 채팅 영역 */}
              <div className="chat-container">
                <Routes>
                  <Route path="/chat/:roomId" element={<ChatRoom />} />
                  <Route path="/setup" element={<UserSetup />} />
                  <Route
                    path="/"
                    element={
                      <div className="welcome-message">
                        🗨️ 채팅방을 선택해주세요!
                      </div>
                    }
                  />
                  {/* 로그인 페이지 접근 방지 */}
                  <Route path="/auth/login" element={<Navigate to="/chat" />} />
                  <Route
                    path="/auth/signup"
                    element={<Navigate to="/chat" />}
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
