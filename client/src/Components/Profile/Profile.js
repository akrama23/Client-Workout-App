import React, { Component } from 'react'
import EditForm from './EditForm'

export class Profile extends Component {
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
                    <EditForm/>
                </div>
            </div>
        )
    }
}

export default Profile;
