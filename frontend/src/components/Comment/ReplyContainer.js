import Reply from "./Reply"
import { useState, useEffect } from "react";


const ReplyContainer = ({replies, comment}) =>{
  const [replyDeleteModal, setReplyDeleteModal] = useState({});

  const toggleReplyDeleteModal = (idx) => () => {
    setReplyDeleteModal((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
  };

  useEffect(() => {
    replies?.forEach((_, idx) => {
      setReplyDeleteModal((state) => ({
        ...state,
        [idx]: false,
      }));
    });
  }, []);

    return (
        <>
        {replies?.map((reply, i) => {
              return (
                <Reply
                key={i}
                reply={reply}
                comment ={comment}
                replyDeleteModal={replyDeleteModal}
                toggleReplyDeleteModal={toggleReplyDeleteModal}
                />
              )
            })
            }
        </>
    )

}

export default ReplyContainer;