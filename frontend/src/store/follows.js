// constants
const LOAD_FOLLOWERS = "follows/LOAD_FOLLOWERS";
const LOAD_FOLLOWING = "follows/LOAD_FOLLOWING";
const ACCEPT_FOLLOW = "follows/ACCEPT_FOLLOW"
const DELETE_FOLLOW = "follows/DELETE_FOLLOW"

// ACTION
const loadFollowers = (followers) => ({
  type: LOAD_FOLLOWERS,
  followers,
});

const loadFollowing = (following) => ({
  type: LOAD_FOLLOWING,
  following,
});

const acceptFollow = (followId) =>({
  type : ACCEPT_FOLLOW,
  followId,
})

const deleteFollow = (followId) =>({
  type : DELETE_FOLLOW,
  followId,
})

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

export const acceptFollowing = (followId) => async (dispatch) =>{
  const res = await fetch(`/api/follows/${followId}`,{
    method:"PUT",
    headers:{'Content-Type': 'application/json'}
  })
  if(res.ok){
    dispatch(acceptFollow(followId))
  }
}

export const deleteFollowing = (followId) => async (dispatch) =>{
  const res = await fetch(`api/follows/${followId}`,{
    method:"DELETE",
    headers: { "Content-Type": "application/json" },
  })
  if(res.ok){
    dispatch(deleteFollow(followId))
  }
}


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
    case ACCEPT_FOLLOW:
      return {...state,
        followers: { ...state.followers, [action.followId]: {...state.followers[action.followId], is_pending:false}}
      }
    case DELETE_FOLLOW:
      const newState = { ...state, followers: { ...state.followers } };
      delete newState.followers[action.followId];
      return newState;
    default:
      return state;
  }
};

export default followsReducer;
