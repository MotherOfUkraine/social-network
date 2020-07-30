import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Input } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import s from '../common/FormsControls/FormControls.module.scss'

const LoginForm = ({ handleSubmit, error, captchaUrl  }) => {
    return (<form onSubmit={handleSubmit}>
        <div>
            <Field placeholder={'email'}
                name={'email'} component={Input}
                type="text"
                validate={required} />
        </div>
        <div>
            <Field
                placeholder={'password'}
                name={'password'}
                component={Input}
                type="password"
                validate={required} />
        </div>
        <div>
            <Field
                type="checkbox"
                name={'rememberMe'}
                component={Input} />
             Remember me
             </div>

        {captchaUrl && <img src={captchaUrl} alt="captcha" />}
        {captchaUrl && <Field placeholder={'symbols'}
            name={'captcha'}
            validate={required}
            component={Input} />}
        {error &&
            <div className={s.summaryError}>
                {error}
            </div>
        }
        <div>
            <button>
                Login
            </button>
        </div>
    </form >
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginReduxForm