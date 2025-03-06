import { useNavigate } from "react-router-dom";

const Logout = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // ✅ JWT 삭제
    sessionStorage.removeItem("chatUser"); // ✅ 사용자명 삭제
    setToken(null); // ✅ 상태 업데이트
    navigate("/auth/login"); // ✅ 로그인 페이지로 이동
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
