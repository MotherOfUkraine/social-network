import React from 'react'
import s from './User.module.scss'
import usersPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';

let User = ({ user, followingInProgress, unfollow, follow }) => {

    return (

        <div>
            <NavLink to={'/profile/' + user.id}>
                <img alt={'user'} src={user.photos.small != null ? user.photos.small : usersPhoto} className={s.usersPhoto}></img>
            </NavLink>

            <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                        follow(user.id)
                    }}>Follow</button>}

            </div>

            <div>{user.name}</div>
            <div>{user.status}</div>


            <div>{"user.location.county"}</div>
            <div>{"user.location.city"}</div>

        </div>
    )

}
export default User
