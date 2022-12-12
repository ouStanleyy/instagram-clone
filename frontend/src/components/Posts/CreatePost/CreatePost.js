import styles from "./CreatePost.module.css";
import { useRef, useState } from "react";
import { addPost } from "../../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import MediaCarousel from "../MediaCarousel";
import { isVideo } from "../../Utill";
import DragDropSVG from "./DragDropSVG";
import FilterItem from "./FilterItem";
import { ProfilePicture } from "../../Elements";
import { useHistory } from "react-router-dom";
import filters from "./FilterItem.module.css";
import filterTypes from "./filterTypes";

/* NEXT STEP:
  1. Create state for each step of post creation
  2. After selecting files, show preview
  3. Change to next step
  4. Allow filters
  5. Show rest of form (caption, allow_comments, show_like_count)
  6. Click "SHARE" will then handle final submission
*/

/* SAVING A FILTER PER IMAGE:
  1. State for current image
  2. State for saving image setting of each image
  3. Button in media carousel will update the current image index
  4. Filter inputs will save the filter at
*/
const CreatePost = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState();
  const [page, setPage] = useState(1);
  const [filter, setFilterType] = useState("original");
  const [caption, setCaption] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [turnOffComments, setTurnOffComments] = useState(false);
  const [hideLikeCount, setHideLikeCount] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOpenUpload = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleFileUpload = (e) => setFiles((prev) => [...prev, e.target.files]);
  const handleNextPage = (e) => setPage((page) => ++page);
  const handlePrevPage = (e) => setPage((page) => --page);
  const updateFilterType = (e) => setFilterType(e.target.value);
  const updateCaption = (e) => {
    setCaption(e.target.value);
    setCharCount(e.target.value.length);
  };
  const handleTurnOffComments = (e) => setTurnOffComments((prev) => !prev);
  const handleHideLikeCount = (e) => setHideLikeCount((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.values(files[0]).forEach((file) => data.append("images", file));

      data.append("caption", caption);
      data.append("is_story", false);
      data.append("show_like_count", !hideLikeCount);
      data.append("allow_comments", !turnOffComments);

      await dispatch(addPost(data));
      return history.push(`/users/${user.id}`);
    } catch (e) {
      // console.log("HERE", e.message);
      setErrors({ error: e.message });
    }
  };
  // console.log("ERROR", errors);

  const handlePreview = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPage((page) => ++page);
    // console.log("E TARGET FILES", e.target.files);
    const files = Object.values(e.target.files);
    // console.log("FILES", files);
    const blobTypes = files.map((file) => ({
      file: new Blob([file]),
      isVideo: isVideo(file.name),
    }));
    // console.log("FILESNAME", blobTypes);
    const objectURL = blobTypes.map(({ file, isVideo }) => {
      return {
        url: URL.createObjectURL(file),
        isVideo,
      };
    });
    // console.log("objectURL", objectURL);
    setPreviewFiles(objectURL);
    // console.log("FILES", previewFiles);
  };

  return (
    <div className={styles.createPostContainer}>
      <div className={styles.containerHeader}>
        {page > 1 && (
          <button className={styles.prevButton} onClick={handlePrevPage}>
            <svg
              aria-label="Back"
              className="_ab6-"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="2.909"
                x2="22.001"
                y1="12.004"
                y2="12.004"
              ></line>
              <polyline
                fill="none"
                points="9.276 4.726 2.001 12.004 9.276 19.274"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polyline>
            </svg>
          </button>
        )}
        <h1>Create new post</h1>
        {page < 3 && page > 1 && (
          <button className={styles.nextButton} onClick={handleNextPage}>
            Next
          </button>
        )}
        {page === 3 && (
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={errors.error}
          >
            Share
            {errors.error && (
              <span className={styles.fileTypeError}>
                File Type Not Allowed!
              </span>
            )}
          </button>
        )}
      </div>
      <form className={styles.createPost}>
        {page === 1 && (
          <div className={styles.pageOne}>
            <DragDropSVG />
            <label
              htmlFor="fileUpload"
              onClick={handleOpenUpload}
              className={styles.uploadText}
            >
              Select from computer
            </label>
            <input
              type="file"
              ref={inputRef}
              id="fileUpload"
              accept={"image/*, video/*"}
              onInput={handleFileUpload}
              onChange={handlePreview}
              multiple
            />
          </div>
        )}
        {page >= 2 && (
          <div className={styles.contentContainer}>
            <div className={styles.previewImages}>
              <MediaCarousel
                medias={previewFiles}
                isPreview={true}
                filter={`${filters[filter]}`}
              />
            </div>
            <div className={styles.options}>
              {page === 2 && (
                <>
                  <h2 className={styles.filterHeader}>Filters</h2>
                  <div className={styles.filtersContainer}>
                    {filterTypes.map((filterType, idx) => {
                      return (
                        <FilterItem
                          filterType={filterType}
                          key={idx}
                          updateFilterType={updateFilterType}
                          filter={filter}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              {page === 3 && (
                <>
                  <div className={styles.pageThree}>
                    <div className={styles.userCard}>
                      <ProfilePicture user={user} size={"small"} />
                      <span className={styles.username}>{user?.username}</span>
                    </div>
                    <div className={styles.textAreaContainer}>
                      <textarea
                        className={styles.caption}
                        placeholder="Write a caption..."
                        maxLength={2200}
                        rows={7}
                        value={caption}
                        onChange={updateCaption}
                      />
                      <span className={styles.charCount}>{charCount}/2200</span>
                    </div>
                  </div>
                  <div className={styles.detailsContainer}>
                    <details className={styles.advancedSettings}>
                      <summary>
                        Advanced settings
                        <svg
                          aria-label="Down chevron icon"
                          className={`_ab6- ${styles.chevron}`}
                          color="#262626"
                          fill="#262626"
                          height="16"
                          role="img"
                          viewBox="0 0 24 24"
                          width="16"
                        >
                          <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
                        </svg>
                      </summary>
                      <div className={styles.switchContainer}>
                        <div className={styles.inputContainer}>
                          <span>Hide like and view counts on this post</span>
                          <input
                            id="showlikes"
                            type="checkbox"
                            checked={hideLikeCount}
                            onChange={handleHideLikeCount}
                          />
                          <label
                            htmlFor="showlikes"
                            className={styles.toggleSwitch}
                          ></label>
                        </div>
                        <div className={styles.inputContainer}>
                          <span>Turn off commenting</span>
                          <input
                            id="allowcomments"
                            type="checkbox"
                            checked={turnOffComments}
                            onChange={handleTurnOffComments}
                          />
                          <label
                            htmlFor="allowcomments"
                            className={styles.toggleSwitch}
                          ></label>
                        </div>
                      </div>
                    </details>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
