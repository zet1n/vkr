import { useAuth } from "../../../utils/AuthContext"
import "./userInfo.css"

const Userinfo = () => {
    const { user } = useAuth()
    return (
        <div className='userInfo'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>{user.name}</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt="" />
                <img src="./video.png" alt="" />
                <img src="./edit.png" alt="" />
            </div>
        </div>
    )
}

export default Userinfo