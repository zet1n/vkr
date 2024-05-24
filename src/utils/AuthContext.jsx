import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get();
            console.log('Данные аккаунта:', accountDetails)
            setUser(accountDetails)            
        }catch (error){
            console.info(error)
        }
        setLoading(false)
    }
    
    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()

        try {
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password)
            console.log('Зашёл:', response)
            const accountDetails = await account.get();
            setUser(accountDetails)
            navigate("/")
        } catch (error) {
            // Если сессия не существует, создаем новую
            if (error.code === 401) { // 401 означает, что сессия не найдена или недействительна
                try {
                    const response = await account.createEmailPasswordSession(credentials.email, credentials.password);
                    console.log('Новая сессия создана:', response);
                } catch (sessionError) {
                    console.error('Ошибка при создании сессии:', sessionError);
                }
            } else {
                console.error('Ошибка при проверке сессии:', error);
            }
        }
    }

    const handleLogout = async () => {
        account.deleteSession('current')
        setUser(null)
    }

    const handleRegister = async (e, credentials) => {
        e.preventDefault()

        if (credentials.password1 !== credentials.password2) {
            alert('Пароли не совпадают!');

        }

        try {
            let response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            )

            await account.createEmailPasswordSession(credentials.email, credentials.password1)

            const accountDetails = await account.get();
            console.log('Данные аккаунта:', accountDetails)
            setUser(accountDetails)   
            navigate('/')

            console.log('Зарегистрировался:', response)
        } catch(error) {
            console.error(error)
        }

    }

    const contextData = {
        user,
        handleUserLogin,
        handleLogout,
        handleRegister
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Загрузка...</p> : children}
    </AuthContext.Provider>
}

export const useAuth = () => { return useContext(AuthContext) };

export default AuthContext
