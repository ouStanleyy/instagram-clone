import Reply from "./Reply"


const ReplyContainer = ({replies}) =>{
  const [replyDeleteModal, setReplyDeleteModal] = useState({});

  const toggleReplyDeleteModal = (idx) => () => {
    setReplyDeleteModal((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
  };

  useEffect(() => {
    replies?.forEach((_, idx) => {
      setDeleteModal((state) => ({
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