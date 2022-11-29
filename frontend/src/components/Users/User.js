import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../../store/users";
import styles from "./User.module.css";

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    (async () => {
      try {
        const res = await dispatch(getUserById(userId));
        console.log(res);
      } catch (err) {}
    })();
  }, [dispatch, userId]);

  const redirectMessage = (
    <>
      <h3>Sorry, this page isn't available.</h3>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <Link to="/">Go back to Instagram.</Link>
      </p>
    </>
  );

  return !user ? (
    redirectMessage
  ) : (
    <>
      {/* <div className={styles.userBody}> */}
      {/* <div className={styles.userInnerBody}> */}
      <div className={styles.userHeader}>
        <img
          src={user.profile_picture}
          alt="profile"
          className={styles.profilePicture}
        />
        <div className={styles.userDetails}>
          <div className={styles.detailsHeader}>
            <p className={styles.username}>{user.username}</p>
          </div>
          <div className={styles.detailsStats}>
            <p>
              <span>{user.posts?.length}</span> posts
            </p>
            <p>
              <span>{user.num_of_followers}</span> followers
            </p>
            <p>
              <span>{user.num_of_followings}</span> following
            </p>
          </div>
          <p className={styles.fullName}>{user.full_name}</p>
          <p className={styles.bio}>{user.bio}</p>
        </div>
      </div>
      <div className={styles.userNavBar}>
        <div className={styles.userNavItem}>
          <div className={styles.navSvg}>
            <svg
              aria-label=""
              class="_ab6-"
              color="#262626"
              fill="#262626"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <rect
                fill="none"
                height="18"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                width="18"
                x="3"
                y="3"
              ></rect>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
              ></line>
            </svg>
          </div>
          <div className={styles.navText}>
            <p>POSTS</p>
          </div>
        </div>
      </div>
      <div className={styles.postsContainer}>
        {user.posts?.map((post) => {
          return (
            <div key={post.id} className={styles.postContainer}>
              <Link to={`/posts/${post.id}`}>
                <div className={styles.postDetails}>
                  <div className={styles.detailsContainer}>
                    <div className={styles.detailsSvg}>
                      <svg
                        aria-label="Like"
                        class="_ab6-"
                        color="#ffffff"
                        fill="#ffffff"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path
                          d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938"
                          fill="#ffffff"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="4"
                        ></path>
                      </svg>
                    </div>
                    <div className={styles.detailsText}>
                      <p>{post.num_of_likes}</p>
                    </div>
                  </div>
                  <div className={styles.detailsContainer}>
                    <div className={styles.detailsSvg}>
                      <svg
                        aria-label="Comment"
                        class="_ab6-"
                        color="#ffffff"
                        fill="#ffffff"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path
                          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                          fill="#ffffff"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </svg>
                    </div>
                    <div className={styles.detailsText}>
                      <p>{post.num_of_comments}</p>
                    </div>
                  </div>
                </div>
                <img
                  src={post.preview_media}
                  alt="preview media"
                  className={styles.previewMedia}
                />
              </Link>
            </div>
          );
        })}
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
export default User;
