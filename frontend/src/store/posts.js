// import { ADD_COMMENT } from "./comments";

// constants
const LOAD_POSTS_FEED = "posts/LOAD_POSTS_FEED";
const LOAD_POST_DETAILS = "posts/LOAD_POST_DETAILS";
const LOAD_POST_EXPLORE = "posts/LOAD_POST_EXPLORE";

// ACTION
const loadPostsFeed = (posts) => ({
  type: LOAD_POSTS_FEED,
  posts,
});

const loadPostDetails = (post) => ({
  type: LOAD_POST_DETAILS,
  post,
});

const loadPostExplore = (posts) => ({
  type: LOAD_POST_EXPLORE,
  posts,
});

// THUNKS
export const getPostsFeed =
  (page = 1) =>
  async (dispatch) => {
    const res = await fetch(`/api/posts/following?${page}`);
    const { Posts: posts } = await res.json();

    if (res.ok) {
      const normalizedData = {};
      posts.forEach((post) => (normalizedData[post.id] = post));
      dispatch(loadPostsFeed(normalizedData));
      return posts;
    }
  };

export const getPostsExplore = () => async (dispatch) => {
  const res = await fetch("/api/posts/");
  const { Posts: posts } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    posts.forEach((post) => (normalizedData[post.id] = post));
    dispatch(loadPostExplore(normalizedData));
    return posts;
  }
};

export const getPostById = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`);
  const post = await res.json();

  if (res.ok) {
    dispatch(loadPostDetails(post));
    return post;
  }
};

export const addPost = (formData) => async (dispatch) => {
  const res = await fetch(`/api/posts/`, {
    method: "POST",
    body: formData,
  });

  const post = await res.json();

  if (res.ok) {
    console.log("WORKED");
    return;
  }
};

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS_FEED:
      return { ...state, ...action.posts };
    case LOAD_POST_DETAILS:
      return {
        ...state,
        [action.post.id]: { ...state[action.post.id], ...action.post },
      };
    case LOAD_POST_EXPLORE:
      return { ...action.posts };
    default:
      return state;
  }
};

export default postsReducer;
