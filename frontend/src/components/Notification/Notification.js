import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../store/follows";
import FollowerUser from "./FollowerUser";
import styles from "./Notification.module.css"


const Notification = ({hideNotification})=>{

    const dispatch = useDispatch()
    const user = useSelector((state)=>state.session.user)
    const followers = useSelector((state)=> Object.values(state.follows.followers))
    const pendingFollowers = followers.filter(follower => follower?.is_pending == true)

    useEffect(()=>{
        dispatch(getFollowers(user?.id))
    },[dispatch])

    return(
        <div
        className={`${styles.notifContainer} ${hideNotification && styles.hideNotification}`}
        >

            <div className={styles.notifHeader}>
                <span
                className={styles.notifLabel}
                >Notification</span>
            </div>
            {pendingFollowers.map((follower)=>{
                return <FollowerUser follower_id={follower?.follower_id}/>
            })}

        </div>
    )
}

export default Notification;