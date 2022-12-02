const LOAD_STORIES_FEED = "stories/LOAD_STORIES_FEED";

const loadStoriesFeed = (stories) => ({
  type: LOAD_STORIES_FEED,
  stories,
});

export const getStoriesFeed = () => async (dispatch) => {
  const res = await fetch("/api/posts/following/stories");
  const { Posts: posts } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    posts.forEach((post) => (normalizedData[post.id] = post));
    dispatch(loadStoriesFeed(normalizedData));
    return posts;
  }
};

const storiesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_STORIES_FEED:
      return { ...action.stories };
    default:
      return state;
  }
};

export default storiesReducer;
