const {  addPostActionCreator, deletePost, default: profileReducer } = require("./profileReducer");

let state = {
    posts: [
        { id: 1, postMessage: "AYE", likesCount: 15 },
        { id: 2, postMessage: "AYE", likesCount: 3 },
        { id: 3, postMessage: "123", likesCount: 10 },
        { id: 4, postMessage: "aaa", likesCount: 0 },
        { id: 5, postMessage: "xxx", likesCount: 2 },
    ]
}

test('length of posts should be incremented', () => {

    let action = addPostActionCreator('hyita')
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(6)

})

test('message of NewPost should be correct', () => {

    let action = addPostActionCreator('hyita')
    let newState = profileReducer(state, action)

    expect(newState.posts[5].postMessage).toBe('hyita')
})

test('length of posts should be decremented', () => {

    let action = deletePost(1)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
})

test(`length of posts should'nt be decremented`, () => {

    let action = deletePost(1000)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(5)
})