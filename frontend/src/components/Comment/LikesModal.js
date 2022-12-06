import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getlikeUsers } from "../../store/likeUsers";
import LikerUser from "./LikerUser";
import styles from "../Follows/Follows.module.css"
import FollowUser from "../Follows/FollowUser";


const LikesModal = ({likes, onClose, currUser}) =>{
    const dispatch = useDispatch()
    const users = useSelector(state=> Object.values(state.likeUsers))
    // const currUser = useSelector(state => state.session.user)
    const userIds = likes.map(like=>like.user_id)
    const likeUsers = users.filter(user => userIds.includes(user.id))

    useEffect(() => {
        (async () => {
          await dispatch(getlikeUsers());
        })();
    }, [dispatch]);

    return (
      <>
        <div className={styles.followsContainer}>
          <h3 className={styles.title}>Likes</h3>
          <div className={styles.listContainer}>
            {
              likeUsers.map((user)=>{
                return <LikerUser
                        key={user?.id}
                        user={user}
                        currUser={currUser}
                        onClose={onClose}
                        />
                // return <FollowUser
                //     key={user?.id}
                //     followId={user?.id}
                //     currUser={currUser}
                //     onClose={onClose} />
              })
            }
          </div>
        </div>
      </>
    )
}

export default LikesModal;