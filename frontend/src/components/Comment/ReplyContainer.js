import Reply from "./Reply"


const ReplyContainer = ({replies}) =>{

    return (
        <>
        {replies?.map((reply, i) => {
              return (
                <Reply
                key={i}
                reply={reply}
                />
              )
            })
            }
        </>
    )

}

export default ReplyContainer;