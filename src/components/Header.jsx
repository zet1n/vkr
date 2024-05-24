import React from "react";
import { LogOut } from "react-feather";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
    
    const {user, handleUserLogout} = useAuth()

    return (
        <div>
            {user ? (
                <>
                    {/* Добрый день {user.name} */}
                    {/* <LogOut onClick={handleUserLogout}/> */}
                </>
            ) : (
                <button>Войти</button>
            )}
        </div>
    )
}

export default Header