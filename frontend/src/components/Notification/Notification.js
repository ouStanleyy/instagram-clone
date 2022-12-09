import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../store/follows";
import FollowerUser from "./FollowerUser";
import styles from "./Notification.module.css";


const Notification = ({hideNotification, pendingFollowers})=>{

    const dispatch = useDispatch()
    const user = useSelector((state)=>state.session.user)

    useEffect(() => {
        (async () => {
          try {
            await dispatch(getFollowers(user?.id));
          } catch (err) {}
        })();
    }, [dispatch, user?.id]);


    return(
        <div
        className={`${styles.notifContainer} ${hideNotification && styles.hideNotification}`}
        >
            <div className={styles.notifHeader}>
                <span
                className={styles.notifLabel}
                >Notifications</span>
            </div>
            {!pendingFollowers.length && <p className={styles.noNotifications}>
                 No New Notifications </p>}
            {pendingFollowers.map((follow)=>{
                return <FollowerUser followId={follow?.id} followerId={follow?.follower_id}/>
            })}

        </div>
    )
}

export default Notification;
