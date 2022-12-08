import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { acceptFollowing } from "../../store/follows"
import { deleteFollowing } from "../../store/follows"
import { getUserById } from "../../store/users"
import { ProfilePicture } from "../Elements"
import styles from "./FollowerUser.module.css"

const FollowerUser = ({followId, followerId}) =>{

    const dispatch = useDispatch()
    const user = useSelector((state)=> state.users[followerId])
    // const followers = useSelector((state)=> Object.values(state.follows.followers))

    useEffect(() => {
        (async () => {
          try {
            await dispatch(getUserById(followerId));
          } catch (err) {}
        })();
      }, [dispatch, followerId]);

    const handleConfirm = (e)=> {
        e.preventDefault()
        dispatch(acceptFollowing(followId))
    }
    
    const handleDelete = (e)=>{
        e.preventDefault()
        dispatch(deleteFollowing(followId))
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