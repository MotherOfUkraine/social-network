
import React from 'react'
import s from './ProfileInfo.module.scss'
import Preloader from '../../common/preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import usersPhoto from '../../../assets/images/user.png'
import { useState } from 'react'
import ProfileDataForm from './ProfileDataForm'
const ProfileInfo = ({ savePhoto, updateStatus, status, profile, isOwner, saveProfile }) => {

    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.largePhoto}>
                <img src={profile.photos.large || usersPhoto} className={s.usersPhoto} alt={'Large'} />
                {isOwner && <input type={'file'} onapChange={onMainPhotoSelected} />}
            </div>
            <div className={s.smallPhoto}>
                <img alt={'Small'} src={profile.photos.small} />
            </div>
            {editMode
                ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit} />
                : <ProfileData profile={profile} isOwner={isOwner} activateEditMode={activateEditMode} />}
            <ProfileStatus updateStatus={updateStatus} status={status} />
        </div>
    )
}

const Contacts = ({ contactTitle, contactValue }) => {
    return <div>
        <div className={s.item}>{contactTitle}: {contactValue}</div>
    </div>
}


const ProfileData = ({ profile, isOwner, activateEditMode }) => {
    return <div>
        {isOwner && <div>
            <button onClick={activateEditMode}>Edit</button>
        </div>}
        <div className={s.container}>
            <h1>Information</h1>
            <div className={s.item}>Full name: {profile.fullName}</div>
            <div className={s.item}>About me: {profile.aboutMe}</div>
            <h3>Contacts</h3>
            {Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
            <h3>Job status</h3>
            <div className={s.item}> Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
            {profile.lookingForAJob &&
                <div className={s.item}> Looking for a job description: {profile.lookingForAJobDescription} </div>
            }

        </div>
    </div>
}



export default ProfileInfo