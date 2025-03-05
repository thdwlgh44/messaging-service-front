import React from "react";
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
import "./styles/App.css";

function App() {
  // ✅ localStorage에서 사용자 이름 확인
  const username = localStorage.getItem("chatUser");

  return (
    <ChatProvider>
      <Router>
        <div className="app-container">
          {/* ✅ 사용자가 이름을 설정하지 않았다면 UserSetup으로 리디렉트 */}
          {!username ? (
            <Routes>
              <Route path="*" element={<Navigate to="/setup" />} />
              <Route path="/setup" element={<UserSetup />} />
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
