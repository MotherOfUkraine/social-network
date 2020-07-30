
import React from 'react'
import { NavLink } from 'react-router-dom'
import s from "./DialogItem.module.scss"
const DialogItem = ({name, id}) => {
    let path = "/dialogs/" + id;
    return (
        <div className={s.dialogsItem}>
            <NavLink to={path}>
                <div className={s.dialog}>
                    {name}
                </div>
            </NavLink>
        </div>
    )
}

export default DialogItem