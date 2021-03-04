import React, { Component } from 'react'

export class FavoriteForm extends Component {

    // state = {
    //     user_id: 0,
    //     workout_id: 0
    // }

    // changeHandler = (e) => {

    //     let {name, value} = e.target

    //     this.setState({
    //       [name]: value
    //     })
    // }
    favoriteHandler = (e) => {
        e.preventDefault()

        let favWorkout = {
            user_id: this.props.user.id,
            workout_id: this.props.workout.id
        }
        let reqPack = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(favWorkout)

         }

         fetch("http://localhost:3000/favorites", reqPack)
            .then(res => res.json())
            .then(favWorkout => {
                this.props.favWorkout(favWorkout)
            })
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.favoriteHandler}>
                {/* <input onChange={this.changeHandler}type="hidden" name="user_id" value={this.props.user.id}/>
                <input onChange={this.changeHandler}type="hidden" name="workout_id" value={this.props.workout.id} /> */}
                <input type="submit" value="Add To Favorite"name="workout" />

                </form>
            </div>
        )
    }
}

export default FavoriteForm;

