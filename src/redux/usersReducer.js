import { usersAPI, followAPI } from "../api/api"
import { updateObjectInArray } from "../utils/validators/objectsHelpers"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'users/SET-USERS'
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE-IS-FOLLOWING-PROGRESS'
let initialState = {
    users: [],
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state, users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalItemsCount: action.totalItemsCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            {
                return {
                    ...state, followingInProgress: action.isFetching
                        ? [...state.followingInProgress, action.userId]
                        : [...state.followingInProgress.filter(id => id !== action.userId)]
                }
            }
        default: return state
    }

}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })

const setUsers = (users) => ({ type: SET_USERS, users })

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })

const setTotalItemsCountCount = (totalItemsCount) => ({ type: SET_TOTAL_USERS_COUNT, totalItemsCount })

const setToggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const setToggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsers = (page, totalCount) => {
    return async (dispatch) => {
        dispatch(setToggleIsFetching(true))
        dispatch(setCurrentPage(page))
        let data = await usersAPI.getUsers(page, totalCount)
        dispatch(setToggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalItemsCountCount(data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(setToggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(setToggleFollowingProgress(false, userId))
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, followAPI.getFollow.bind(followAPI), followSuccess)
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, followAPI.getUnfollow.bind(followAPI), unfollowSuccess)
    }
}

export default usersReducer