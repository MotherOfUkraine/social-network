export const getUsersData = (state) => {
    return state.usersPage.users
}

export const getPageSizeData = (state) => {
    return state.usersPage.pageSize
}

export const getTotalItemsCountCountData = (state) => {
    return state.usersPage.totalItemsCount
}

export const getCurrentPageData = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetchingData = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgressData = (state) => {
    return state.usersPage.followingInProgress
}
