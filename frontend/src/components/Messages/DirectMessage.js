import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const DirectMessage = () => {
  const rooms = useSelector((state) => Object.keys(state.rooms));
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sio, setSio] = useState("");
  const [sid, setSid] = useState("");
  // const [loading, setLoading] = useState(true);

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = () => {
    if (!message) {
      return;
    }
    sio.emit("message", { message, room: roomId });
    setMessage("");
  };

  useEffect(() => {
    if (sio) {
      sio.once("message", (data) => {
        if (data) {
          if (sid) console.log("compare", sid === data?.sid);
          setMessages([...messages, data.message]);
        }
      });
    }
  }, [sid, messages]);

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000/", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000/",
      },
      query: `room=${roomId}`,
    });

    setSio(socket);

    socket.on("connect", (data) => {
      if (data) {
        console.log("sid", data);
        setSid(data?.sid);
      }
    });

    // setLoading(false);

    // socket.on("disconnect", (data) => {
    //   console.log(data);
    // });

    return () => {
      socket.disconnect();
      setSid("");
    };
  }, [roomId]);

  return !rooms.includes(roomId) ? (
    <Redirect to="/messages" />
  ) : (
    <div>
      <h2>Direct Message</h2>
      <ul>
        {messages.map((message, idx) => {
          return <li key={idx}>{message}</li>;
        })}
      </ul>
      <input type="text" value={message} onChange={handleText} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default DirectMessage;
