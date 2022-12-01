// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const LOAD_FOLLOWING = "session/LOAD_FOLLOWING";

// ACTION
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const loadFollowing = (following) => ({
  type: LOAD_FOLLOWING,
  following,
});

// THUNKS
export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (credential, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (username, email, password, full_name) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        full_name,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const getFollowing = () => async (dispatch, getState) => {
  const { id } = getState().session.user;
  const res = await fetch(`/api/users/${id}/follows`);
  const { Follows } = await res.json();

  if (res.ok) {
    const normalizedData = {};
    Follows.filter((follow) => follow.follower_id === parseInt(id)).forEach(
      (follow) => (normalizedData[follow.id] = follow)
    );
    dispatch(loadFollowing(normalizedData));
    return normalizedData;
  }
};

export default function reducer(state = { user: null, following: {} }, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { user: null, following: {} };
    case LOAD_FOLLOWING:
      return { ...state, following: action.following };
    default:
      return state;
  }
}
