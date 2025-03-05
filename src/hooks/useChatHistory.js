import { useEffect, useState } from "react";
import axios from "axios";

const useChatHistory = (roomId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/chat/messages/${roomId}`)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("❌ 메시지 불러오기 실패", error));
  }, [roomId]);

  return messages;
};

export default useChatHistory;
