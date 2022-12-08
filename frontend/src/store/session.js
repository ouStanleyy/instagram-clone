// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const LOAD_FOLLOWING = "session/LOAD_FOLLOWING";
const ADD_FOLLOW = "session/ADD_FOLLOW";
const REMOVE_FOLLOW = "session/REMOVE_FOLLOW";
const UPDATE_USER = "session/UPDATE_USER";

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

const addFollow = (follow) => ({
  type: ADD_FOLLOW,
  follow,
});

const removeFollow = (followId) => ({
  type: REMOVE_FOLLOW,
  followId,
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

export const editProfile =
  ({ profilePicture, fullName, username, bio, email, phoneNumber, gender }) =>
  async (dispatch) => {
    const res = await fetch(`/api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile_picture: profilePicture,
        full_name: fullName,
        username,
        bio,
        email,
        phone_number: phoneNumber,
        gender,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(setUser(data));
      return null;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const updatePassword =
  ({ oldPassword, newPassword }) =>
  async (dispatch) => {
    const res = await fetch("/api/users/profile/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(setUser(data));
    } else {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    }
  };

export const deleteProfile = () => async (dispatch) => {
  const res = await fetch(`/api/users/profile`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeUser());
    return { message: "Deleted Profile" };
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

export const followUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/follows`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(addFollow(data));
    return data;
  }
};

export const unfollowUser = (followId) => async (dispatch) => {
  const res = await fetch(`/api/follows/${followId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) dispatch(removeFollow(followId));
};

export default function reducer(state = { user: null, following: {} }, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { user: null, following: {} };
    case LOAD_FOLLOWING:
      return { ...state, following: action.following };
    case ADD_FOLLOW:
      return {
        ...state,
        following: { ...state.following, [action.follow.id]: action.follow },
      };
    case REMOVE_FOLLOW:
      const newState = { ...state, following: { ...state.following } };
      delete newState.following[action.followId];
      return newState;
    default:
      return state;
  }
}
