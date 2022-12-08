const ADD_REPLY = "replies/add";
const GET_REPLIES = "replies/get";
// const DELETE_REPLY = "replies/delete";

const addReply = (reply) => {
  return {
    type: ADD_REPLY,
    payload: reply,
  };
};
const getReplies = (replies) => {
  return {
    type: GET_REPLIES,
    payload: replies,
  };
};

export const createReply = (reply, comment_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment_id}/replies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reply),
  });
  const newReply = await response.json();
  if(response.ok){
    dispatch(loadReplies(comment_id))
  }
  // if (response.ok) {
  //   dispatch(addReply(newReply));
  //   return null;
  // } else if (response.status < 500) {
  //   const data = await response.json();
  //   if (data.errors) {
  //     return data.errors;
  //   }
  // } else {
  //   return ["An error occurred. Please try again."];
  // }
};

export const loadReplies = (comment_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment_id}/replies`);
  const data = await response.json();

  const payload = {};
  if(data.Replies){
    for (let obj of data.Replies) {
      payload[obj.id] = obj;
    }
  }

  dispatch(getReplies(payload));
};

const initialState = {};

const replyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REPLY:
      return { ...state, [action.payload.id]: action.payload };
    case GET_REPLIES:
      return {...state, ...action.payload };
    default:
      return state;
  }
};

export default replyReducer;
