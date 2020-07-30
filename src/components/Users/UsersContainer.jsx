import React from 'react'
import Users from './Users'
import { connect } from 'react-redux'
import { followSuccess, unfollowSuccess, setCurrentPage, setToggleFollowingProgress, getUsers, unfollow, follow } from '../../redux/usersReducer'
import Preloader from '../common/preloader/Preloader'
import { compose } from 'redux'
import { getUsersData, getPageSizeData, getTotalItemsCountCountData, getCurrentPageData, getIsFetchingData, getFollowingInProgressData } from '../../redux/usersSelectors'

class UsersContainer extends React.Component {

    componentDidMount() {

        const { currentPage, pageSize, getUsers } = this.props

        getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        const { pageSize, getUsers } = this.props
        getUsers(pageNumber, pageSize)
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                unfollow={this.props.unfollow}
                follow={this.props.follow} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsersData(state),
        pageSize: getPageSizeData(state),
        totalItemsCount: getTotalItemsCountCountData(state),
        currentPage: getCurrentPageData(state),
        isFetching: getIsFetchingData(state),
        followingInProgress: getFollowingInProgressData(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        followSuccess, unfollowSuccess, setCurrentPage,
        setToggleFollowingProgress, getUsers, unfollow, follow
    })
)(UsersContainer)

