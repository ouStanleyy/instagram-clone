import styles from "./StoryCarousel.module.css";
import { useSelector } from "react-redux";
import StoryItem from "./StoryItem";
import { useEffect, useRef, useState } from "react";

/*
  Bug: the scroll and client width were being calculated before all stories were rendered,
  giving an incorrect width by the time the rest were rendered

  Fix: use isLoaded and setIsLoaded to force a rerender on the child component so that it
  is recalculated
*/
const StoryCarousel = () => {
  /* For now, carousel for the followings, then replace for just stories */
  const SCROLL_DISTANCE = 400;
  const followings = useSelector((state) =>
    Object.values(state.session.following).filter((user) => !user.is_pending)
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const scrollRef = useRef(null);

  const scrollLeft = () =>
    setScroll((scrollRef.current.scrollLeft -= SCROLL_DISTANCE));
  const scrollRight = () =>
    setScroll((scrollRef.current.scrollLeft += SCROLL_DISTANCE));

  useEffect(() => {
    setScrollWidth(scrollRef.current.scrollWidth);
    setClientWidth(scrollRef.current.clientWidth);
  }, [scroll, isLoaded]);

  return (
    <>
      <div className={styles.storyCarouselContainer} ref={scrollRef}>
        <div className={styles.storyList}>
          {followings.map((user) => {
            return (
              <StoryItem
                user={user?.following_user}
                setIsLoaded={setIsLoaded}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.arrowContainer}>
        <span
          className={`material-symbols-outlined + ${styles.leftArrow} + ${
            scroll <= 0 && styles.hideArrow
          }`}
          onClick={scrollLeft}
        >
          expand_circle_down
        </span>
        <span
          className={`material-symbols-outlined + ${styles.rightArrow} + ${
            scroll >= scrollWidth - clientWidth && styles.hideArrow
          }`}
          onClick={scrollRight}
        >
          expand_circle_down
        </span>
      </div>
    </>
  );
};

export default StoryCarousel;
