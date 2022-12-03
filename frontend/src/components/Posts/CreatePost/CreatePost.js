import styles from "./CreatePost.module.css";
import { useRef, useState } from "react";
import { addPost } from "../../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import MediaCarousel from "../MediaCarousel";
import { isVideo } from "../../Utill";
import DragDropSVG from "./DragDropSVG";
import FilterItem from "./FilterItem";
import { ProfilePicture } from "../../Elements";

/* NEXT STEP:
  1. Create state for each step of post creation
  2. After selecting files, show preview
  3. Change to next step
  4. Allow filters
  5. Show rest of form (caption, allow_comments, show_like_count)
  6. Click "SHARE" will then handle final submission
*/
const filterTypes = [
  "original",
  "clarendon",
  "gingham",
  "moon",
  "lark",
  "reyes",
  "juno",
  "slumber",
  "crema",
  "ludwig",
  "aden",
  "perpetua",
];

const CreatePost = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState();
  const [page, setPage] = useState(1);
  const [filter, setFilterType] = useState("original");

  const handleOpenUpload = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleFileUpload = (e) => {
    setFiles((prev) => [...prev, e.target.files]);
  };

  const handleNextPage = (e) => {
    e.preventDefault();

    setPage((page) => ++page);
  };

  const handlePrevPage = (e) => {
    e.preventDefault();

    setPage((page) => --page);
  };

  const updateFilterType = (e) => {
    console.log("updating filter", filter);
    setFilterType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.values(files[0]).forEach((file) => data.append("images", file));

    data.append("caption", "Testing upload aws");
    data.append("is_story", false);
    data.append("show_like_count", true);
    data.append("allow_comments", true);

    const result = await dispatch(addPost(data));

    console.log("RESULT", result);
  };

  const handlePreview = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPage((page) => ++page);
    console.log("E TARGET FILES", e.target.files);
    const files = Object.values(e.target.files);
    console.log("FILES", files);
    const blobTypes = files.map((file) => ({
      file: new Blob([file]),
      isVideo: isVideo(file.name),
    }));
    console.log("FILESNAME", blobTypes);
    const objectURL = blobTypes.map(({ file, isVideo }) => {
      return {
        url: URL.createObjectURL(file),
        isVideo,
      };
    });
    console.log("objectURL", objectURL);
    setPreviewFiles(objectURL);
    console.log("FILES", previewFiles);
  };

  return (
    <div className={styles.createPostContainer}>
      <div className={styles.containerHeader}>
        {page > 1 && <button onClick={handlePrevPage}>Prev</button>}
        <h1>Create new post</h1>
        {page < 3 && page > 1 && <button onClick={handleNextPage}>Next</button>}
        {page === 3 && <button>Share</button>}
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
              // onChange={handleFileUpload}
              onChange={handlePreview}
              multiple
            />
          </div>
        )}
        {page >= 2 && (
          <div className={styles.pageTwo}>
            <div className={styles.previewImages}>
              <MediaCarousel medias={previewFiles} isPreview={true} />
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
                <div className={styles.pageThree}>
                  <div className={styles.userCard}>
                    <ProfilePicture user={user} sizes={"small"} />
                    {user?.username}
                  </div>
                  <textarea
                    className={styles.caption}
                    placeholder="Write a caption..."
                    maxLength={2200}
                    rows={7}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
