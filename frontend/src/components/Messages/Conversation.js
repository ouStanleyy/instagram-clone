import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getRooms } from "../../store/rooms";
import styles from "./Conversation.module.css";

const Conversation = ({ sessionUser, rooms }) => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const oldMessages = rooms.find(
    (room) => room.id === parseInt(roomId)
  )?.messages;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sio, setSio] = useState("");
  const [sid, setSid] = useState("");
  // const [loading, setLoading] = useState(true);

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    sio.emit("message", { message, room: roomId, uid: sessionUser.id });
    setMessage("");
  };

  useEffect(() => {
    if (sio) {
      sio.once("message", (data) => {
        if (data) {
          if (sid) console.log("compare", sid === data?.sid);
          setMessages([...messages, data]);
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
      setMessages([]);
    };
  }, [roomId]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getRooms());
        // setLoaded(true);
      } catch (err) {}
    })();
  }, [dispatch, roomId]);

  return (
    rooms.length > 0 &&
    (!rooms.find((room) => room.id === parseInt(roomId)) ? (
      <Redirect to="/messages" />
    ) : (
      <>
        <div className={styles.convoHeader}>
          <h3>Username goes here</h3>
          {/* <Link to={`/users/${room.id}`}>
            <div className={styles.userContainer}>
              <div className={styles.profilePicture}>
                <ProfilePicture user={room.user} size={"medium"} />
              </div>
              <div className={styles.userDetails}>
                <p className={styles.username}>{room.user?.username}</p>
                <p className={styles.fullName}>{room.user?.full_name}</p>
              </div>
            </div>
          </Link> */}
        </div>
        <div className={styles.conversationWrapper}>
          <div className={styles.conversation}>
            {oldMessages.map(({ id, message, user_id }) => (
              <p
                key={id}
                className={`${styles.message} ${
                  user_id === sessionUser.id ? styles.outgoing : styles.incoming
                }`}
              >
                {message}
              </p>
            ))}
            {messages.map((data, idx) => (
              <p
                key={idx}
                className={`${styles.message} ${
                  data.sid === sid ? styles.outgoing : styles.incoming
                }`}
              >
                {data.message}
              </p>
            ))}
            <div id={styles.anchor}></div>
          </div>
        </div>
        <form className={styles.messageInput} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Message..."
            value={message}
            onChange={handleText}
          />
        </form>
      </>
    ))
  );
};

export default Conversation;
