// constants
const LOAD_USERS = "users/LOAD_USERS";
const LOAD_USER_DETAILS = "users/LOAD_USER_DETAILS";

// ACTION
const loadUsers = (users) => ({
  type: LOAD_USERS,
  users,
});

const loadUserDetails = (user) => ({
  type: LOAD_USER_DETAILS,
  user,
});

// THUNKS
export const getUsers = () => async (dispatch) => {
  const res = await fetch("/api/users/");
  const { users } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    users.forEach((user) => (normalizedData[user.id] = user));
    dispatch(loadUsers(normalizedData));
    return users;
  }
};

export const getUserById = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  const user = await res.json();

  if (res.ok) {
    dispatch(loadUserDetails(user));
    return user;
  }
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USERS:
      return { ...action.users };
    case LOAD_USER_DETAILS:
      return {
        ...state,
        [action.user.id]: { ...state[action.user.id], ...action.user },
      };
    default:
      return state;
  }
};

export default usersReducer;
