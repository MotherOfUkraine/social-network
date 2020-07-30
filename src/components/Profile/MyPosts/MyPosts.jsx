import React from 'react'
import s from "./MyPosts.module.scss"
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators/validators'
import { TextArea } from '../../common/FormsControls/FormsControls'


const maxLenth10 = maxLengthCreator(10)

const MyPosts = React.memo(({addPost, posts}) => {
    let onAddPost = (values) => {
        addPost(values.newPostText)
    }

    let postsElements =
        posts.map(p => <Post key={p.id} postMessage={p.postMessage} likesCount={p.likesCount} />)

    return (
        <div className={s.postsBlock}>
            <h3> My posts</h3>
            <AddPostReduxForm onSubmit={onAddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const AddPostForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field name='newPostText'
                placeholder='Enter post text'
                component={TextArea}
                validate={[required, maxLenth10]} />
            <button>Add post</button>
        </form>
    )
}

const AddPostReduxForm = reduxForm({ form: 'addPostForm' })(AddPostForm)

export default MyPosts