import React, { Component } from 'react'

export class WorkoutForm extends Component {
    render() {
        return (
            <div>
                <form>
                    <label>
                        Workout Name:
                        <br/>
                    <input type="text" name="name" placeholder="Workout Name..."/>
                    </label>
                        <br/>
                    <label>
                       Description:
                        <br/>
                    <input type="text" name="last_name" placeholder="Last Name..."/>
                    </label>
                        <br/>
                    <label>
                        Image:
                        <br/>
                    <input type="text" name="image" placeholder="Image URl..."/>
                    </label>
                        <br/>
                    <label>
                        Video:
                        <br/>
                    <input type="text" name="video" placeholder="Youtube Video..."/>
                    </label>
                        <br/>
                    <input type="submit" value="Create" />
                        <br/>

                </form>
            </div>
        )
    }
}

export default WorkoutForm;