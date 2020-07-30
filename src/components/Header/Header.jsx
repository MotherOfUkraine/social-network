import React from "react"
import s from "./Header.module.scss"
import { NavLink } from "react-router-dom"
const Header = ({isAuth,login, logout}) => {
    return (
        <header className={s.header}>
            <img alt={'Logo'} src="https://i.pinimg.com/originals/d9/12/09/d91209340bdc005936c46323a62caaff.png"></img>

            <div className={s.loginBlock}>
                {isAuth
                    ? <div>
                        {login}
                        <button onClick={logout}>Logout</button>
                    </div>
                    : <NavLink to="/login">Login</NavLink>}
                    </div>
        </header>
    )
}

export default Header