import { profileAPI } from "../api/api"
import { stopSubmit } from "redux-form"

const ADD_POST = 'profle/ADD-POST'
const SET_USER_PROFILE = 'profle/SET-USER-PROFILE'
const SET_STATUS = 'profle/SET-STATUS'
const DELETE_POST = 'profle/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'profle/SAVE-PHOTO-SUCCESS'

let initialState = {
    posts: [
        { id: 1, postMessage: "AYE", likesCount: 15 },
        { id: 2, postMessage: "AYE", likesCount: 3 },
        { id: 3, postMessage: "123", likesCount: 10 },
        { id: 4, postMessage: "aaa", likesCount: 0 },
        { id: 5, postMessage: "xxx", likesCount: 2 },
    ],
    profile: null,
    status: ''
}


const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [...state.posts, { id: 5, postMessage: action.newPostText, likesCount: 0 }]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
            }
        }
        default: return state
    }

}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const deletePost = (id) => ({ type: DELETE_POST, id })

const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

const setStatus = (status) => ({ type: SET_STATUS, status })

export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userID) => async (dispatch) => {
    let data = await profileAPI.getProfile(userID)
    dispatch(setUserProfile(data.data))
}

export const getStatus = (userID) => async (dispatch) => {
    let res = await profileAPI.getStatus(userID)
    dispatch(setStatus(res.data))
}

export const updateStatus = (status) => async (dispatch) => {

    let res = await profileAPI.updateStatus(status)
    if (res.data.resultCode === 0)
        dispatch(setStatus(status))
}


export const savePhoto = (file) => async (dispatch) => {

    let res = await profileAPI.savePhoto(file)
    if (res.data.resultCode === 0)
        dispatch(savePhotoSuccess(res.data.data.photos))
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId  = getState().auth.userId
    let res = await profileAPI.saveProfile(profile)
    if (res.data.resultCode === 0)
        dispatch(getUserProfile(userId))
        else {
            dispatch(stopSubmit('editProfile', {_error: res.data.messages[0]}))
            return Promise.reject(res.data.messages[0])
        }
}


export default profileReducer