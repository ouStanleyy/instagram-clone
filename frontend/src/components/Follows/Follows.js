import { useSelector } from "react-redux";
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";
import styles from "./Follows.module.css";

function Follows({ followType, userId, onClose }) {
  const currUser = useSelector((state) => state.session.user);

  return (
    <div className={styles.followsContainer}>
      <div className={styles.headerContainer}>
        <h3 className={styles.title}>{followType}</h3>
        <div className={styles.svgContainer} onClick={onClose}>
          <svg
            aria-label="Close"
            // class="_ab6-"
            color="#262626"
            fill="#262626"
            height="18"
            role="img"
            viewBox="0 0 24 24"
            width="18"
          >
            <polyline
              fill="none"
              points="20.643 3.357 12 12 3.353 20.647"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            ></polyline>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              x1="20.649"
              x2="3.354"
              y1="20.649"
              y2="3.354"
            ></line>
          </svg>
        </div>
      </div>
      <div className={styles.listContainer}>
        {followType === "Followers" ? (
          <FollowersList
            userId={userId}
            currUser={currUser}
            onClose={onClose}
          />
        ) : (
          <FollowingList
            userId={userId}
            currUser={currUser}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

export default Follows;
