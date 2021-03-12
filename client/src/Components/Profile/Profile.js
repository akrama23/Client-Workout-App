import React, { Component } from 'react'
import EditForm from './EditForm'

export class Profile extends Component {

    state = {
        editForm: false 
    }

    toggleEditForm= () => {
        this.setState({
            editForm: !this.state.editForm
            
        })
    }
    render() {
        return (
            <div>
                <div>
                    <img src={this.props.user.image} alt={this.props.user.last_name} width="250" height="200"/>
                </div>
                 <div>
                    <strong>First Name:</strong> {this.props.user.first_name}
                </div>
                <div>
                    <strong>Last Name:</strong> {this.props.user.last_name}
                </div>
                <div>
                    <strong>Email:</strong> {this.props.user.email}
                </div>
                <div>
                    {this.state.editForm && <EditForm user={this.props.user} handleEditForm={this.props.handleEditForm} setCurrentUser={this.props.setCurrentUser} updatedUser={this.props.updatedUser}/>}
                    <button onClick={this.toggleEditForm}>Edit Profile Information</button>
                </div>
            </div>
        )
    }
}

export default Profile;
