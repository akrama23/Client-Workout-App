import React, { Component } from 'react'

export class EditForm extends Component {
    render() {
        return (
            <div>
                <form>
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
                    <label>
                        Email:
                        <br/>
                    <input type="text" name="email" placeholder="Email..."/>
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
