import "../styles/MessageList.css";

const MessageList = ({ messages, user }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => {
        const isSentByUser = message.sender === user;

        return (
          <div
            key={index}
            className={`message-container ${isSentByUser ? "sent-container" : "received-container"}`}
          >
            {/* 🔥 메시지 박스 */}
            <div className={`message ${isSentByUser ? "sent" : "received"}`}>
              <div className="message-content">{message.content}</div>
              <div className="message-time">
                {new Date(message.timestamp).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
