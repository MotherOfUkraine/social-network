import React, { useState} from 'react'
import { useEffect } from 'react'

const ProfileStatus = (props) => {

    let [editmode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editmode &&
                <div>
                    Status:<span onDoubleClick={activateMode}>{props.status || "No status"}</span>
                </div>
            }
            {editmode &&
                <div>
                    <input onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status} />
                </div>
            }
        </div>
    )

}


// class ProfileStatus extends React.Component {
//     state = {
//         editMode: false,
//         status: this.props.status
//     }

//     activateEditMode = () => {
//         this.setState({
//             editMode: true
//         })
//     }

//     deactivateEditMode() {
//         this.setState({
//             editMode: false
//         });
//         this.props.updateStatus(this.state.status);
//     }

//     render() {
//         return (
//             <div>
//                 {!this.state.editMode &&
//                     <div>
//                         <span onDoubleClick={this.activateEditMode}>{this.props.status || "-------"}</span>
//                     </div>

//                 }
//                 {this.state.editMode &&
//                     <div>
//                         <input onChange={this.onStatusChange} autoFocus={true}
//                             onBlur={this.deactivateEditMode.bind(this)}
//                             value={this.state.status} />
//                     </div>

//                 }
//             </div>
//         )
//     }
// }

export default ProfileStatus 