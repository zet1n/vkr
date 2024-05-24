import PrivateRoutes from "./components/PrivateRoutes"
import { AuthProvider } from "./utils/AuthContext"

import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import Notification from "./components/notification/Notification"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const App = () => {

  const user = true

  return (
    <div className='container'>
      <Router>
        <AuthProvider>
          <Routes>
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<><List /> <Chat /> <Detail /></>} />
            </Route>

          </Routes>
        </AuthProvider>
      </Router>
      {/* {user ? (
            <>
              <List/>
              <Chat/>
              <Detail/>
            </>
          ) : (
            <Login/>
        )} */}
      <Notification />
    </div>
  )
}

export default App