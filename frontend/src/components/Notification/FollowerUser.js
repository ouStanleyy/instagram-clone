import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserById } from "../../store/users"

const FollowerUser = ({follower_id}) =>{

    const dispatch = useDispatch()
    const user = useSelector((state)=> state.users[follower_id])

    useEffect(()=>{
        dispatch(getUserById(follower_id))
    },[dispatch])

    return (
        <>
            <h1> here is user requested {user?.username}</h1>
        </>
    )
}

export default FollowerUser;