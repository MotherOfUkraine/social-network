import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { getUserProfile, updateStatus, getStatus,savePhoto, saveProfile } from '../../redux/profileReducer'
import { withRouter, Redirect } from 'react-router-dom'
import { compose } from 'redux'


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userID = this.props.match.params.userID

        const { authorizedUserID, getUserProfile, getStatus } = this.props
        if (!userID) {
            userID = authorizedUserID
            if (!userID) {
                return <Redirect to={'login'} />
            }
        }
        getUserProfile(userID)
        getStatus(userID)
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userID !== prevProps.match.params.userID)
            this.refreshProfile()
    }
    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userID}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.userId,
    isAith: state.auth.isAuth

})

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
)(ProfileContainer)
