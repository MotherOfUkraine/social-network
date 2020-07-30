import React from 'react'
import { Field, reduxForm } from 'redux-form'
import s from './ProfileInfo.module.scss'
import { required } from '../../../utils/validators/validators'
import { Input, TextArea } from '../../common/FormsControls/FormsControls'
import style from '../../common/FormsControls/FormControls.module.scss'

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>
        {error &&
            <div className={style.summaryError}>
                {error}
            </div>
        }
        <div className={s.container}>
            <h1>Information</h1>
            <div className={s.item}>Full name:
            <Field placeholder={'Full name'}
                    name={'fullName'}
                    type="text"
                    validate={required}
                    component={Input} />
            </div>
            <div className={s.item}>About me:
                <Field name={'aboutMe'}
                    type="text"
                    placeholder={'Own description'}
                    component={TextArea} /></div>
            <h3>Contacts</h3>
            {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.item}>
                    {key}: <Field component={Input} name={'contacts.' + key} placeholder={key} />
                </div>
            })}
            <h3>Job status</h3>
            <div className={s.item}> Looking for a job:
            <Field name={'lookingForAJob'}
                    type="checkbox"
                    component={Input} /></div>
            <div className={s.item}> Looking for a job description:
                <Field placeholder={'My proffesional skills'}
                    name={'lookingForAJobDescription'}
                    type="text"
                    validate={required}
                    component={TextArea} /> </div>
        </div>
    </form>

}

const ProfileReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm)
export default ProfileReduxForm
