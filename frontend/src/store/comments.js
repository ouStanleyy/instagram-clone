export const ADD_COMMENT = "comments/add";
const GET_All_COMMENTS = "comments/get";
const EDIT_COMMENT = "comments/edit";
const DELETE_COMMENT = "comments/delete";

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  };
};
const getAllComments = (comments) => {
  return {
    type: GET_All_COMMENTS,
    payload: comments,
  };
};
const updateComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    payload: comment,
  };
};
const deleteComment = (comment_id) => {
  return {
    type: DELETE_COMMENT,
    payload: comment_id,
  };
};

export const createComment = (comment, post_id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post_id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  const newComment = await response.json();
  if (response.ok) {
    dispatch(addComment(newComment));
    return null;
  // } else if (response.status < 500) {
  //   const data = await response.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // } else {
  //   return ["An error occurred. Please try again."];
  }
};

export const loadAllComments = (post_id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post_id}/comments`);
  const data = await response.json();

  const payload = {};

  for (let obj of data.Comments) {
    payload[obj.id] = obj;
  }

  dispatch(getAllComments(payload));
};

export const editComment = (comment, comment_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  const editedComment = await response.json();
  if (response.ok) {
    dispatch(updateComment(editedComment));
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

export const deleteCommentThunk = (comment_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteComment(comment_id));
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

const initialState = {};

const commentReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case GET_All_COMMENTS:
      return { ...action.payload };
    case EDIT_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COMMENT:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default commentReducer;
