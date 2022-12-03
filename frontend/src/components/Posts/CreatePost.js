import styles from "./CreatePost.module.css";
import { useRef, useState } from "react";
import { addPost } from "../../store/posts";
import { useDispatch } from "react-redux";
import MediaCarousel from "./MediaCarousel";
import { isVideo } from "../Utill";

/* NEXT STEP:
  1. Create state for each step of post creation
  2. After selecting files, show preview
  3. Change to next step
  4. Allow filters
  5. Show rest of form (caption, allow_comments, show_like_count)
  6. Click "SHARE" will then handle final submission
*/
const CreatePost = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState();

  const handleUpload = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleFileUpload = (e) => {
    setFiles((prev) => [...prev, e.target.files]);
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
      <h1>Create new post</h1>
      <form className={styles.createPost}>
        <svg
          aria-label="Icon to represent media such as images or videos"
          class="_ab6-"
          color="#262626"
          fill="#262626"
          height="77"
          role="img"
          viewBox="0 0 97.6 77.3"
          width="96"
        >
          <path
            d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
            fill="currentColor"
          ></path>
          <path
            d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
            fill="currentColor"
          ></path>
          <path
            d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
            fill="currentColor"
          ></path>
        </svg>
        <div>Drag photos and vidoes here</div>
        <label
          htmlFor="fileUpload"
          onClick={handleUpload}
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
        <div className={styles.previewImages}>
          {/* <MediaCarousel
            medias={previewFiles?.map((file) => ({
              url: file,
            }))}
          /> */}
          <MediaCarousel medias={previewFiles} isPreview={true} />
        </div>
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default CreatePost;