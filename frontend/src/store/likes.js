const ADD_LIKE = "likes/add";
const GET_All_LIKES = "likes/get";
const DELETE_LIKE = "likes/delete";

const addLike = (like) => {
    return {
      type: ADD_LIKE,
      payload: like,
    };
  };
const getAllLikes = (likes) => {
    return {
      type: GET_All_LIKES,
      payload: likes,
    };
};

const deleteLike= (like_id) => {
    return {
      type: DELETE_LIKE,
      payload: like_id,
    };
};


export const loadAllLikes = (post_id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post_id}/likes`);
    const data = await response.json();

    const payload = {};

    for (let obj of data.Likes) {
      payload[obj.id] = obj;
    }

    dispatch(getAllLikes(payload));
};


export const createLike = (like, post_id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post_id}/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(like),
    });
    const like = await response.json();
    if (response.ok) {
      dispatch(addLike(like));
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

export const deleteLikeThunk = (post_id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post_id}/likes`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (response.ok) {
      dispatch(deleteLike(data.id));
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

const initialState = {}

const likeReducer = (state = initialState, action) =>{
    let newState = { ...state }
    switch(action.type){
        case ADD_LIKE:
            return { ...state, [action.payload.id]: action.payload };
        case GET_All_LIKES:
            return { ...action.payload };
        case DELETE_LIKE:
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}

export default likeReducer;