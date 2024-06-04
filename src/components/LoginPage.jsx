import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const LoginPage = () => {
    const {user, handleUserLogin} = useAuth()
    const [credentials, setCredentials] = useState({email: '', password: ''})

    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            navigate('/')
        }

    },[])

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
    }

    return (
        <div className ="login">
            <div className="item">
                <form onSubmit={(e) => {handleUserLogin(e, credentials)}}>
                    <div>
                        <label>Почта:</label>
                        <input 
                            type="email"
                            required
                            name ="email"
                            placeholder="Адрес электронной почты..."
                            value={credentials.email}
                            onChange={(e) => {handleInputChange(e)}}
                         />
                    </div>

                    <div>
                        <label>Пароль:</label>
                        <input 
                            type="password"
                            required
                            name ="password"
                            placeholder="Пароль..."
                            value={credentials.password}
                            onChange={(e) => {handleInputChange(e)}}
                         />
                    </div>

                    <div>
                        <input className="" type="submit" value="Войти"/>
                    </div>
                </form>
                <p>Нет аккаунта? Зарегистрируйся <Link to="/register">здесь</Link></p>
            </div>
        </div>
    )
}

export default LoginPage