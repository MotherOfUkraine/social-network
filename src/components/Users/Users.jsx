import React from 'react'
import Paginator from '../common/Paginator/Paginator';
import User from './User';


let Users = ({ currentPage, totalItemsCount, pageSize, onPageChanged, users, followingInProgress, unfollow, follow }) => {

    return <div>
        <Paginator currentPage={currentPage} totalItemsCount={totalItemsCount} pageSize={pageSize} onPageChanged={onPageChanged} />
        {
            users.map(u =>
                <User key={u.id}
                    user={u}
                    followingInProgress={followingInProgress}
                    unfollow={unfollow}
                    follow={follow} />)
        }
    </div>
}

export default Users
