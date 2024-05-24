import { useEffect, useState, useRef } from "react"
import "./chat.css"
import { Trash2 } from "react-feather"
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from "../../appwriteConfig"
import EmojiPicker from "emoji-picker-react"
import { ID, Query, Role, Permission } from 'appwrite'
import Header from "../Header"
import { useAuth } from "../../utils/AuthContext"


const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const endRef = useRef(null)

    const { user } = useAuth()

    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')

    useEffect(() => {
        getMessages()

        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
            // Callback will be executed on changes for documents A and all files.

            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                console.log('Сообщение создано');
                setMessages(prevState => [response.payload, ...prevState])
            }

            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                console.log('Сообщение удалено!!!');
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        return () => {
            unsubscribe();
        }

    }, [])

    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
        )
        console.log('RESPONSE:', response)
        setMessages(response.documents)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let payload = {
            user_id: user.$id,
            username: user.name,
            body: messageBody
        }

        let permissions = [
            Permission.write(Role.user(user.$id))
        ]

        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        )

        console.log('Создано!', response)

        //setMessages(prevState => [response, ...messages])

        setMessageBody('')
    }

    const deleteMessage = async (message_id) => {
        databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
        //setMessages(prevState => messages.filter(message => message.$id !== message_id))
    }

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    const handleEmoji = e => {
        setMessageBody(prevMessageBody => prevMessageBody + e.emoji);
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    return (

        <div className='chat'>
            <Header />
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Магазин Ситилинк</span>
                        <p>Крупный магазин бытовой техники в Перми</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                {/* Ниже происходит проверка, принадлежит ли сообщение пользователю по id, в зависимости от этого выбирается стиль для сообщения */}
                {messages.map(message => (
                    <div key={message.$id} className={`message ${message.user_id === user.$id ? 'own' : ''}`}> 
                        <img className="img1" src="./avatar.png" alt="" />
                        <div className="texts">
                            <span>{message?.username ? (
                                <span className="username">{message.username}</span>
                            ) : (
                                <span className="username">Неизвестный пользователь</span>
                            )}</span>
                            <div>
                                <p>{message.body}</p>
                            </div>
                            <div>
                                <span>{new Date(message.$createdAt).toLocaleString()}</span>
                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                    <Trash2 className="delete"
                                        onClick={() => { deleteMessage(message.$id) }} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <form onSubmit={handleSubmit}>
                    <div className="icons">
                        <img src="./img.png" alt="" />
                        <img src="./camera.png" alt="" />
                        <img src="./mic.png" alt="" />
                    </div>
                    <textarea type="text"
                        placeholder="Напишите сообщение..."
                        required
                        maxLength="1000"
                        onChange={(e) => setMessageBody(e.target.value)}
                        value={messageBody}></textarea>
                    <div className="emoji">
                        <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />
                        <div className="picker">
                            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                        </div>
                    </div>
                    <div className="">
                        <input className="sendButton" type="submit" value="Отправить" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat