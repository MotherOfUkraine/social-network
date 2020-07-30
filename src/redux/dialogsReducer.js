const SEND_MESSAGE = 'dialogs/SEND-MESSAGE'

let initialState = {
    dialogs: [
        { id: 1, name: 'Edward' },
        { id: 2, name: 'Svetnala' },
        { id: 3, name: "Viktor" },
        { id: 4, name: "Anastasia" }
    ],
    messages: [
        { id: 1, message: 'AYE' },
        { id: 2, message: 'YO' },
        { id: 3, message: "dick" },
        { id: 4, message: "fuck" }
    ],
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: action.newMessageText }]
            }
        default:
            return state
    }
}
export const sendMessageActionCreator = (newMessageText) => ({ type: SEND_MESSAGE ,newMessageText})

export default dialogsReducer