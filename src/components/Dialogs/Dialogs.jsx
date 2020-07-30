import React from 'react'
import s from './Dialogs.module.scss'
import DialogItem from './DialogItem/DialogItem'
import Message from './Messages/Message'
import { Redirect } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { TextArea } from '../common/FormsControls/FormsControls'
import { required, maxLengthCreator } from '../../utils/validators/validators'

const maxLength100 = maxLengthCreator(100)
const Dialogs = ({sendMessage, dialogsPage, isAuth}) => {

    let addNewMessage = (values) => {
        sendMessage(values.newMessageText)
    }

    let state = dialogsPage
    let dialogsElements =
        state.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />)

    let messagesElements =
        state.messages.map(m => <Message key={m.id} id={m.id} message={m.message} />)

    if (!isAuth) return <Redirect to={'/login'} />
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
                <DialogsReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

const addMessageForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} >
            <Field placeholder='Enter your message'
                component={TextArea}
                name={'newMessageText'}
                validate={[required, maxLength100]} />
            <button>Send Message</button>
        </form>
    )
}


const DialogsReduxForm = reduxForm({ form: 'addMessageForm' })(addMessageForm)

export default Dialogs