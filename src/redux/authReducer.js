import { authAPI, securityAPI } from "../api/api"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = 'auth/SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA_URL-SUCCESS'

let initialState = {
    userId: null,
    email: null,
    login: null,
    ifFetching: false,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

export default authReducer
const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
const GetCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })
export const auth = () => async (dispatch) => {
    let res = await authAPI.getAuthData()

    if (res.data.resultCode === 0) {
        let { id, email, login } = res.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let res = await authAPI.login(email, password, rememberMe, captcha)

    if (res.data.resultCode === 0) {
        dispatch(auth())
    }
    else {
        if (res.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let msg = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: msg }))
    }
}

export const logout = () => async (dispatch) => {
    const res = await authAPI.logout()

    if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const res = await securityAPI.getCaptcha()
    const captchaUrl = res.data.url
    dispatch(GetCaptchaUrlSuccess(captchaUrl))
}