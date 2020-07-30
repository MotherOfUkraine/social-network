import React from 'react'
import s from "./Message.module.scss"
const Message = ({message,}) => {
    return (
        <div className={s.dialog}>
            <div className={s.message}>
                {message}
            </div>
        </div>
    )
}

export default Message