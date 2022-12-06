import { useEffect, useState } from "react";

const DirectMessage = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = () => {
    if (!message) {
      return;
    }
    socket.emit("data", { message, room: "16" });
    setMessage("");
  };

  useEffect(() => {
    socket.on("data", (data) => {
      setMessages([...messages, data.data]);
    });
  }, [socket, messages]);

  return (
    <div>
      <h2>Direct Message</h2>
      <input type="text" value={message} onChange={handleText} />
      <button onClick={handleSubmit}>submit</button>
      <ul>
        {messages.map((message, idx) => {
          return <li key={idx}>{message}</li>;
        })}
      </ul>
    </div>
  );
};

export default DirectMessage;
