import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getUserById } from "../../store/users";
import Follows from "../Follows/Follows";
import { PostDetailCard } from "../Posts";
import styles from "./User.module.css";
import { ProfilePicture } from "../Elements";
import { isVideo } from "../Utill";

function User() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.users[userId]);
  const isOwner = useSelector(
    (state) => state.session.user.id === parseInt(userId)
  );
  const isFollowing = useSelector((state) =>
    Object.values(state.session.following)
  ).filter((follow) => follow.following_id === user?.id).length;
  const [loaded, setLoaded] = useState(false);
  const [followsModal, setFollowsModal] = useState({
    show: false,
    followType: "",
  });
  const [postModal, setPostModal] = useState({});

  // Toggles the follow modal on/off depending on the followType("followers", "following")
  const toggleFollowsModal =
    (followType = "") =>
    () => {
      setFollowsModal((state) => ({
        show: !state.show,
        followType,
      }));
    };

  // Toggles the post modal on/off depending on the current index of the mapped posts
  const togglePostModal = (idx) => () => {
    setPostModal((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
    if (postModal[idx]) dispatch(getUserById(userId));
  };

  // Maps each index of the posts as keys in the post modal state and defaults their value to "false"
  useEffect(() => {
    user?.posts
      ?.filter((post) => !post.is_story)
      .forEach((_, idx) => {
        setPostModal((state) => ({
          ...state,
          [idx]: false,
        }));
      });
  }, [user?.posts]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUserById(userId));
      } catch (err) {}
      setLoaded(true);
    })();
  }, [dispatch, userId]);

  const privateMessage = (
    <div className={styles.privateMessage}>
      <p>This Account is Private</p>
      <p>Follow to see their photos and</p>
      <p>videos.</p>
    </div>
  );

  const redirectMessage = (
    <>
      <h3>Sorry, this page isn't available.</h3>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <Link to="/">Go back to Instagram.</Link>
      </p>
    </>
  );

  return (
    loaded &&
    (!user ? (
      redirectMessage
    ) : (
      <>
        {/* <div className={styles.userBody}> */}
        {/* <div className={styles.userInnerBody}> */}
        <div className={styles.userHeader}>
          {/* <img
            src={user.profile_picture}
            alt="profile"
            className={styles.profilePicture}
          /> */}
          <ProfilePicture user={user} size={"XLarge"} />
          <div className={styles.userDetails}>
            <div className={styles.detailsHeader}>
              <p className={styles.username}>{user.username}</p>
            </div>
            <div className={styles.detailsStats}>
              <p>
                <span>{user.num_of_posts}</span> posts
              </p>
              <p
                className={
                  (isOwner || !user.is_private || isFollowing) &&
                  styles.followModal
                }
                onClick={
                  (isOwner || !user.is_private || isFollowing) &&
                  toggleFollowsModal("Followers")
                }
              >
                <span>{user.num_of_followers}</span> followers
              </p>
              <p
                className={
                  (isOwner || !user.is_private || isFollowing) &&
                  styles.followModal
                }
                onClick={
                  (isOwner || !user.is_private || isFollowing) &&
                  toggleFollowsModal("Following")
                }
              >
                <span>{user.num_of_followings}</span> following
              </p>
            </div>
            <p className={styles.fullName}>{user.full_name}</p>
            <p className={styles.bio}>{user.bio}</p>
          </div>
        </div>
        {!isOwner && user.is_private && !isFollowing ? (
          privateMessage
        ) : (
          <>
            <div className={styles.userNavBar}>
              <div className={styles.userNavItem}>
                <div className={styles.navSvg}>
                  <svg
                    aria-label=""
                    // class="_ab6-"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      width="18"
                      x="3"
                      y="3"
                    ></rect>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="9.015"
                      x2="9.015"
                      y1="3"
                      y2="21"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="14.985"
                      x2="14.985"
                      y1="3"
                      y2="21"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="21"
                      x2="3"
                      y1="9.015"
                      y2="9.015"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
              {!user.num_of_posts ? (
                <p>No Posts Yet</p>
              ) : (
                user?.posts
                  ?.filter((post) => !post.is_story)
                  .map((post, idx) => {
                    return (
                      <div key={post.id} className={styles.postContainer}>
                        {/* <Link to={`/posts/${post.id}`}> */}
                        <div
                          className={styles.postDetails}
                          onClick={togglePostModal(idx)}
                        >
                          <div className={styles.detailsContainer}>
                            <div className={styles.detailsSvg}>
                              <svg
                                aria-label="Like"
                                // class="_ab6-"
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
                                  strokeLinejoin="round"
                                  strokeWidth="4"
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
                                // class="_ab6-"
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
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                ></path>
                              </svg>
                            </div>
                            <div className={styles.detailsText}>
                              <p>{post.num_of_comments}</p>
                            </div>
                          </div>
                        </div>
                        {isVideo(post?.preview_media) ? (
                          <video
                            width="100%"
                            height="100%"
                            muted
                            className={styles.previewMedia}
                          >
                            <source
                              src={post?.preview_media}
                              type={"video/mp4"}
                            />
                            {/* <source src={media?.url} type={"video/mov"} /> */}
                          </video>
                        ) : (
                          <img
                            src={post.preview_media}
                            alt="preview media"
                            className={styles.previewMedia}
                          />
                        )}
                        {post.num_of_media > 1 && (
                          <div className={styles.multiImage}>
                            <svg
                              aria-label="Carousel"
                              // class="_ab6-"
                              color="#ffffff"
                              fill="#ffffff"
                              height="22"
                              role="img"
                              viewBox="0 0 48 48"
                              width="22"
                            >
                              <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path>
                            </svg>
                          </div>
                        )}
                        {/* </Link> */}
                        {postModal[idx] && (
                          <Modal onClose={togglePostModal(idx)}>
                            <PostDetailCard postId={post.id} />
                          </Modal>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          </>
        )}
        {followsModal.show && (
          <Modal onClose={toggleFollowsModal()}>
            <Follows
              followType={followsModal.followType}
              userId={userId}
              onClose={toggleFollowsModal()}
            />
          </Modal>
        )}
        {/* </div> */}
        {/* </div> */}
      </>
    ))
  );
}
export default User;
