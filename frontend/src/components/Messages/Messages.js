import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import DirectMessage from "./DirectMessages";

const Messages = () => {
  const [sioInstance, setSioInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);

  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  useEffect(() => {
    if (buttonStatus === true) {
      const socket = io("http://127.0.0.1:5000/", {
        transports: ["websocket"],
        cors: {
          origin: "http://localhost:3000/",
        },
        query: "room=16",
      });

      setSioInstance(socket);

      socket.on("connect", (data) => {
        console.log(data);
      });

      setLoading(false);

      socket.on("disconnect", (data) => {
        console.log(data);
      });

      return function cleanup() {
        socket.disconnect();
      };
    }
  }, [buttonStatus]);

  return (
    <div>
      <h3>Messages</h3>
      {!buttonStatus ? (
        <button onClick={handleClick}>turn chat on</button>
      ) : (
        <>
          <button onClick={handleClick}>turn chat off</button>
          <div>{!loading && <DirectMessage socket={sioInstance} />}</div>
        </>
      )}
    </div>
  );
};

export default Messages;
