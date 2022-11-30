// constants
const LOAD_POSTS_FEED = "posts/LOAD_POSTS_FEED";
const LOAD_POST_DETAILS = "posts/LOAD_POST_DETAILS";

// ACTION
const loadPostsFeed = (posts) => ({
  type: LOAD_POSTS_FEED,
  posts,
});

const loadPostDetails = (post) => ({
  type: LOAD_POST_DETAILS,
  post,
});

// THUNKS
export const getPostsFeed = () => async (dispatch) => {
  const res = await fetch("/api/posts/following");
  const { Posts: posts } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    posts.forEach((post) => (normalizedData[post.id] = post));
    dispatch(loadPostsFeed(normalizedData));
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

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS_FEED:
      return { ...action.posts };
    case LOAD_POST_DETAILS:
      return {
        ...state,
        [action.post.id]: { ...state[action.post.id], ...action.post },
      };
    default:
      return state;
  }
};

export default postsReducer;
