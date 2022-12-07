import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { acceptFollowing } from "../../store/follows"
import { unfollowUser } from "../../store/session"
import { getUserById } from "../../store/users"
import { ProfilePicture } from "../Elements"
import styles from "./FollowerUser.module.css"

const FollowerUser = ({follow_id, follower_id}) =>{

    const dispatch = useDispatch()
    const user = useSelector((state)=> state.users[follower_id])
    const followers = useSelector((state)=> Object.values(state.follows.followers))

    useEffect(() => {
        (async () => {
          try {
            await dispatch(getUserById(follower_id));
          } catch (err) {}
        })();
      }, [dispatch, follower_id]);

    const handleConfirm = (e)=> {
        e.preventDefault()
        dispatch(acceptFollowing(follow_id))
    }

    const handleDelete = (e)=>{
        e.preventDefault()
        dispatch(unfollowUser(follow_id))
    }

    return (
        <div className={styles.userContainer}>
            <div className={styles.profilePicture}>
                <ProfilePicture user={user} size={"medium"}/>
            </div>
            <div className={styles.userDetails}>
                <p className={styles.username}>{user?.username}</p>
                <p className={styles.fullName}>{user?.full_name}</p>
            </div>
            <div className={styles.buttonContainer}>
                <button
                className={styles.confirmButton}
                onClick={handleConfirm}
                >Confirm</button>
                <button
                className={styles.deleteButton}
                onClick={handleDelete}
                >Delete</button>
            </div>
        </div>
    )
}

export default FollowerUser;