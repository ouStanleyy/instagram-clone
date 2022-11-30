// constants
const LOAD_FOLLOWERS = "follows/LOAD_FOLLOWERS";
const LOAD_FOLLOWING = "follows/LOAD_FOLLOWING";

// ACTION
const loadFollowers = (followers) => ({
  type: LOAD_FOLLOWERS,
  followers,
});

const loadFollowing = (following) => ({
  type: LOAD_FOLLOWING,
  following,
});

// THUNKS
export const getFollowers = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/follows`);
  const { Follows } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    Follows.filter(
      (follow) => follow.following_id === parseInt(userId)
    ).forEach((follow) => (normalizedData[follow.id] = follow));
    dispatch(loadFollowers(normalizedData));
    return normalizedData;
  }
};

export const getFollowing = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/follows`);
  const { Follows } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    Follows.filter((follow) => follow.follower_id === parseInt(userId)).forEach(
      (follow) => (normalizedData[follow.id] = follow)
    );
    dispatch(loadFollowing(normalizedData));
    return normalizedData;
  }
};

const followsReducer = (state = { followers: {}, following: {} }, action) => {
  switch (action.type) {
    case LOAD_FOLLOWERS:
      return {
        ...state,
        followers: { ...action.followers },
      };
    case LOAD_FOLLOWING:
      return {
        ...state,
        following: { ...action.following },
      };
    default:
      return state;
  }
};

export default followsReducer;
