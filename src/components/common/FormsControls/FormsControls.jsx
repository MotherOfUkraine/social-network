import React from 'react'
import s from './FormControls.module.scss'

const FormControl = ({ input, meta: {touched, error},children}) => {

    const showError = touched && error
    return (
        <div className={s.formControl + ' ' + (showError ? s.error : "")}>

            <div>
                {children}
            </div>

            {showError && <span>{error}</span>}
        </div>
    )
}


export const TextArea = (props) => {
    const { input, meta, child, ...restprops } = props
    return <FormControl {...props}><textarea {...input}{...restprops} /></FormControl>
}


export const Input = (props) => {
    const { input, meta, child, ...restprops } = props
    return <FormControl {...props}><input {...input}{...restprops} /></FormControl>

}
