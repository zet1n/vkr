import { useState } from "react"
import "./login.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
    const [avatar,setAvatar] = useState ({
        file:null,
        url:""
    })

    const handleAvatar = e => {
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleLogin = e => {
        e.preventDefault()
    }

    return (
        <div className="login">
            <div className="item">
                <h2>Рады видеть вас снова,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Почта" name="email"/>
                    <input type="password" placeholder="Пароль" name="password"/>
                    <button>Авторизоваться</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Создать аккаунт</h2>
                <form>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Загрузить изображение</label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                    <input type="text" placeholder="Имя пользвателя" name="username"/>
                    <input type="text" placeholder="Почта" name="email"/>
                    <input type="password" placeholder="Пароль" name="password"/>
                    <button>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
}

export default Login