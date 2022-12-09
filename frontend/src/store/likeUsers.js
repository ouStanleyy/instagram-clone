const GET_USERS = "likeUsers/GET_USERS";


const loadLikeUsers = (users) => ({
    type: GET_USERS,
    users,
  });


export const getlikeUsers = () => async (dispatch) => {
    const res = await fetch("/api/users/");
    const { users } = await res.json();

    if (res.ok) {
      const normalizedData = {};
      users.forEach((user) => (normalizedData[user.id] = user));
      dispatch(loadLikeUsers(normalizedData));
      return users;
    }
};

const likeUsersReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_USERS:
        return { ...state, ...action.users };
      default:
        return state;
    }
  };

  export default likeUsersReducer;