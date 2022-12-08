import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Switch, Route } from "react-router-dom";
import { getRooms } from "../../store/rooms";
import Conversation from "./Conversation";
import { ProfilePicture } from "../Elements";
import styles from "./Messages.module.css";

const Messages = () => {
  const dispatch = useDispatch();
  // const [sioInstance, setSioInstance] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [buttonStatus, setButtonStatus] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const rooms = useSelector((state) => Object.values(state.rooms));

  // const handleClick = () => {
  //   if (buttonStatus === false) {
  //     setButtonStatus(true);
  //   } else {
  //     setButtonStatus(false);
  //   }
  // };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getRooms());
        // setLoaded(true);
      } catch (err) {}
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   if (buttonStatus === true) {
  //     const socket = io("http://127.0.0.1:5000/", {
  //       transports: ["websocket"],
  //       cors: {
  //         origin: "http://localhost:3000/",
  //       },
  //       query: `room=${user.id}`,
  //     });

  //     setSioInstance(socket);

  //     socket.on("connect", (data) => {
  //       console.log(data);
  //     });

  //     setLoading(false);

  //     socket.on("disconnect", (data) => {
  //       console.log(data);
  //     });

  //     return function cleanup() {
  //       socket.disconnect();
  //     };
  //   }
  // }, [buttonStatus]);

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.messagesList}>
        <h3 className={styles.sessionUser}>{sessionUser.username}</h3>
        <h3 className={styles.title}>Messages</h3>
        {rooms.map((room) => (
          <Link key={room.id} to={`/messages/${room.id}`}>
            <div className={styles.userContainer}>
              <div className={styles.profilePicture}>
                <ProfilePicture user={room.user} size={"large"} />
              </div>
              <div className={styles.userDetails}>
                <p className={styles.username}>{room.user?.username}</p>
                <p className={styles.fullName}>{room.user?.full_name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.convoContainer}>
        <Switch>
          <Route path="/messages/:roomId" exact={true}>
            <Conversation sessionUser={sessionUser} rooms={rooms} />
          </Route>
        </Switch>
      </div>
      {/* {!buttonStatus ? (
        <button onClick={handleClick}>turn chat on</button>
      ) : (
        <>
        <button onClick={handleClick}>turn chat off</button>
        <div>{!loading && <DirectMessage socket={sioInstance} />}</div>
        </>
      )} */}
    </div>
  );
};

export default Messages;
