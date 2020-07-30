import { auth } from "./authReducer"

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

let initialState = {
    initialized: false
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default: return state
    }
}


const setInitializedSuccess = () => ({ type: INITIALIZED_SUCCESS })

export const initializeApp = () => (dispatch) => {

    let promise = dispatch(auth())

    Promise.all([promise]).then( () => {
        dispatch(setInitializedSuccess())
    })
}

export default appReducer
