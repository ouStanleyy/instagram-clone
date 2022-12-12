// constants
const LOAD_POSTS_FEED = "posts/LOAD_POSTS_FEED";
const LOAD_MORE_POSTS_FEED = "posts/LOAD_MORE_POSTS_FEED";
const LOAD_POSTS_EXPLORE = "posts/LOAD_POST_EXPLORE";
// const LOAD_MORE_POSTS_EXPLORE = "posts/LOAD_MORE_POST_EXPLORE";
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

const loadPostsExplore = (posts) => ({
  type: LOAD_POSTS_EXPLORE,
  posts,
});

const loadMorePostsFeed = (posts) => ({
  type: LOAD_MORE_POSTS_FEED,
  posts,
});

const loadMorePostsExplore = (posts) => ({
  type: LOAD_MORE_POSTS_FEED,
  posts,
});

// const addCommentToPost = (postId, comment) => ({
//   type: ADD_COMMENT,
//   postId,
//   comment,
// });

// THUNKS
export const getPostsFeed =
  (page = 1) =>
  async (dispatch) => {
    const res = await fetch(`/api/posts/following?page=${page}`);
    const { Posts: posts } = await res.json();

    if (res.ok) {
      const normalizedData = {};
      posts.forEach((post) => (normalizedData[post.id] = post));
      dispatch(loadPostsFeed(normalizedData));
      return posts;
    }
  };

export const getPostsExplore = () => async (dispatch) => {
  // const res = await fetch(`/api/posts/?page=${page}`);
  const res = await fetch(`/api/posts/`);
  const { Posts: posts } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    posts.forEach((post) => (normalizedData[post.id] = post));
    dispatch(loadPostsExplore(normalizedData));
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

  const data = await res.json();

  if (res.ok) {
    return;
  } else {
    console.log("Broke in addPOst");
    console.log(data.errors);
    console.log("DATA", data);
  }
};

export const getMorePostsFeed = (page) => async (dispatch) => {
  const res = await fetch(`/api/posts/following?page=${page}`);
  const { Posts: posts } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    posts.forEach((post) => (normalizedData[post.id] = post));
    dispatch(loadMorePostsFeed(normalizedData));
    return;
  } else {
    return {
      message: "failed to load more posts",
    };
  }
};

export const getMorePostsExplore = () => async (dispatch) => {
  // const res = await fetch(`/api/posts/?page=${page}`);
  const res = await fetch(`/api/posts/`);
  const { Posts: posts } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    posts.forEach((post) => (normalizedData[post.id] = post));
    dispatch(loadMorePostsExplore(normalizedData));
    return;
  } else {
    return {
      message: "failed to load more posts",
    };
  }
};

export const updatePost = (postId, formData) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    body: formData,
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(loadPostDetails(data));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    // console.log("OK");
    return res;
  }
};

// export const addCommentToPost = (postId, comment) => async (dispatch) => {
//   const res = await fetch("/api/");
// };

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POSTS_FEED:
      return { ...action.posts };
    case LOAD_MORE_POSTS_FEED:
      return { ...state, ...action.posts };
    case LOAD_POST_DETAILS:
      return {
        ...state,
        [action.post.id]: { ...state[action.post.id], ...action.post },
      };
    case LOAD_POSTS_EXPLORE:
      return { ...action.posts };
    // case LOAD_MORE_POSTS_EXPLORE:
    //   return { ...state, ...action.posts };
    default:
      return state;
  }
};

export default postsReducer;
