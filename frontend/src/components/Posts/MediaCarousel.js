import styles from "./MediaCarousel.module.css";
import { useState, useEffect, useRef } from "react";

const MediaCarousel = ({ medias }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useRef([]);
  const hideArrow = medias?.length < 2;

  useEffect(() => {
    slides.current.forEach((slide, idx) => {
      slide.style.transform = `translateX(${100 * (idx - currentSlide)}%)`;
    });
  }, [currentSlide]);

  const handleSlidePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSlideNext = () => {
    if (currentSlide < medias.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
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
          <img src={media.url} alt="testing" />
        </div>
      ))}
      <button
        className={`${styles.btn} ${styles.btnPrev} ${
          (currentSlide === 0 || hideArrows) && styles.hideArrow
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
