import React from 'react'
import {useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    const [credentials, setCredentials] = useState({name:'',email:'', password1:'', password2:''})

    const {handleRegister} = useAuth()

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value 
    
        setCredentials({...credentials, [name]:value})
        // console.log('CREDS:', credentials)
      }

  return (
    <div className="auth--container">
      <div className="form--wrapper">

        <form onSubmit={(e) => {handleRegister(e, credentials)}}>
          <div className="field--wrapper">
                <label>Предприятие:</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={credentials.name}
                  placeholder="Имя предприятия..."
                  onChange={(e) => {handleInputChange(e)}}
                />
            </div>

            <div className="field--wrapper">
                <label>Почта:</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="Введите почту..."
                  value={credentials.email}
                  onChange={(e) => {handleInputChange(e)}}
                />
            </div>

            <div className="field--wrapper">
                <label>Пароль:</label>
                <input 
                  required
                  type="password" 
                  name="password1"
                  placeholder="Введите пароль..."
                  value={credentials.password1}
                  onChange={(e) => {handleInputChange(e)}}
                />
            </div>

            <div className="field--wrapper">
                <label>Подтвердите пароль:</label>
                <input 
                  required
                  type="password" 
                  name="password2"
                  placeholder="Подтвердите пароль..."
                  value={credentials.password2}
                  onChange={(e) => {handleInputChange(e)}}
                />
            </div>

            <div className="field--wrapper">
                <input className="btn btn--lg btn--main" type="submit" value="Зарегистрироваться"/>
            </div>
        </form>

        <p>Уже есть аккаунт? Войди <Link to="/login">здесь</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage
