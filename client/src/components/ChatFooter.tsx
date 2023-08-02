import { FormEvent, useState } from "react";
import { WithSocketProps } from "../types/socket";

const ChatFooter = ({ socket }: WithSocketProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    const canISendMessage =
      message.trim() &&
      localStorage.getItem("userName") &&
      localStorage.getItem("room");

    if (canISendMessage) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room: localStorage.getItem("room"),
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
