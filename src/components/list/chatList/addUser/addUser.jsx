import "./addUser.css"

const AddUser = () => {
    return (
        <div className="addUser">
            <form >
                <input type="text" placeholder="Имя пользователя" name="username" />
                <button>Поиск</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Магазин Ситилинк  </span>
                </div>
                <button>Добавить пользователя</button>
            </div>
        </div>
    )
}

export default AddUser