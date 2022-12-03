import styles from "./MediaCarousel.module.css";
import { useState, useEffect, useRef } from "react";
import { isVideo } from "../Utill";

const MediaCarousel = ({ medias, isPreview = false }) => {
  /* Carousel can be used as a preview carousel or actual carousel */
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useRef([]);
  const hideArrow = medias?.length < 2;

  /* Carousel animation logic */
  useEffect(() => {
    slides.current.forEach((slide, idx) => {
      slide.style.transform = `translateX(${100 * (idx - currentSlide)}%)`;
    });
  }, [currentSlide]);

  /* Carousel scroll buttons */
  const handleSlidePrev = (e) => {
    e.preventDefault();
    if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
  };

  const handleSlideNext = (e) => {
    e.preventDefault();
    if (currentSlide < medias.length - 1) setCurrentSlide((prev) => prev + 1);
  };

  return (
    <div className={styles.slider}>
      {medias?.map((media, idx) => (
        <div
          key={idx}
          ref={(el) => (slides.current[idx] = el)}
          className={styles.slide}
          style={{ transform: `translateX(${idx * 100}%)` }}
        >
          {/* CLEAN THIS UP */}
          {!isPreview && isVideo(media?.url) ? (
            <video width="100%" height="100%" muted controls loop>
              <source src={media?.url} type={"video/mp4"} />
            </video>
          ) : !isPreview && !isVideo(media?.url) ? (
            <img src={media?.url} alt="actual" />
          ) : isPreview && media.isVideo ? (
            <video width="100%" height="100%" muted controls loop>
              <source src={media?.url} type={"video/mp4"} />
            </video>
          ) : (
            <img src={media?.url} alt="preview" />
          )}

          {/* {isVideo(media?.url) ? (
            <video width="100%" height="100%" muted controls loop>
              <source src={media?.url} type={"video/mp4"} />
            </video>
          ) : (
            <img src={media?.url} alt="testing" />
          )}

          {media?.isVideo ? (
            <video width="100%" height="100%" muted controls loop>
              <source src={media?.url} type={"video/mp4"} />
            </video>
          ) : (
            <img src={media?.url} alt="testing" />
          )} */}

          {/* <video width="100%" height="100%" muted controls loop>
            <source src={media?.url} type={"video/mp4"} />
          </video> */}
        </div>
      ))}
      <button
        className={`${styles.btn} ${styles.btnPrev} ${
          (currentSlide === 0 || hideArrow) && styles.hideArrow
        }`}
        onClick={handleSlidePrev}
      >
        <span className={`material-symbols-outlined + ${styles.leftArrow}`}>
          expand_circle_down
        </span>
      </button>
      <button
        className={`${styles.btn} ${styles.btnNext} ${
          (currentSlide === slides?.current?.length - 1 || hideArrow) &&
          styles.hideArrow
        }`}
        onClick={handleSlideNext}
      >
        <span className={`material-symbols-outlined + ${styles.rightArrow}`}>
          expand_circle_down
        </span>
      </button>
    </div>
  );
};

export default MediaCarousel;
