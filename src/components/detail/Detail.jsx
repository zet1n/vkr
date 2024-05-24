import { useState } from "react"
import { useAuth } from "../../utils/AuthContext"
import "./detail.css"


const Detail = () => {
    const {user, handleLogout} = useAuth()

    const [showPhotos, setShowPhotos] = useState(false);

    const togglePhotos = () => {
        setShowPhotos(prevState => !prevState);
    };

    return (
        <div className='detail'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>{user.name}</h2>
                <p>Информация о пользователе</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Настройки чата</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Настройки чата</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Политика и помощь</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title" onClick={togglePhotos}>
                        <span>Вложенные изображения</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className={`photos ${showPhotos ? 'show' : 'hide'}`}>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                    src="https://avatars.mds.yandex.net/get-mpic/12523390/2a0000018f1a89d839a4179dc5dd5af69638/orig" 
                                    alt="" 
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>

                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                    src="https://avatars.mds.yandex.net/get-mpic/12523390/2a0000018f1a89d839a4179dc5dd5af69638/orig" 
                                    alt="" 
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                    
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                    src="https://avatars.mds.yandex.net/get-mpic/12523390/2a0000018f1a89d839a4179dc5dd5af69638/orig" 
                                    alt="" 
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                                      
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                    src="https://avatars.mds.yandex.net/get-mpic/12523390/2a0000018f1a89d839a4179dc5dd5af69638/orig" 
                                    alt="" 
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Общие файлы</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button>Заблокировать</button>
                <button className="logout" onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    )
}

export default Detail