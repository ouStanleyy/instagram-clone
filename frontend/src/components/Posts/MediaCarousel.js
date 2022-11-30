import styles from "./MediaCarousel.module.css";
import { useState, useEffect } from "react";

const MediaCarousel = ({ medias }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = document.querySelectorAll(`.${styles.slide}`);

  useEffect(() => {
    slides.forEach((slide, idx) => {
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
          className={styles.slide}
          style={{ transform: `translateX(${idx * 100}%)` }}
        >
          <img src={media.url} key={idx} alt="testing" />
        </div>
      ))}
      <button
        className={`${styles.btn} ${styles.btnPrev} ${
          currentSlide === 0 && styles.hideArrow
        }`}
        onClick={handleSlidePrev}
      >
        <span
          className={`material-symbols-outlined + ${styles.leftArrow}`}
        ></span>
      </button>
      <button
        className={`${styles.btn} ${styles.btnNext} ${
          currentSlide === slides.length - 1 && styles.hideArrow
        }`}
        onClick={handleSlideNext}
      >
        <span
          className={`material-symbols-outlined + ${styles.rightArrow}`}
        ></span>
      </button>
    </div>
  );
};

export default MediaCarousel;
