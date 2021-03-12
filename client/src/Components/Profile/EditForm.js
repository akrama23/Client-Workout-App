import { Component } from 'react'

class EditForm extends Component {

    

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleEditForm}>
                    <label>
                        First Name:
                        <br/>
                    <input type="text" name="first_name" placeholder="First Name..."/>
                    </label>
                        <br/>
                    <label>
                       Last Name:
                        <br/>
                    <input type="text" name="last_name" placeholder="Last Name..."/>
                    </label>
                        <br/>
                    <label>
                        Image:
                        <br/>
                    <input type="text" name="image" placeholder="Image..."/>
                    </label>
                        <br/>
                    <input type="submit" value="Edit" />
                        <br/>

                </form>
                <br/>
                <br/>
            </div>
        )
    }
}

export default EditForm
