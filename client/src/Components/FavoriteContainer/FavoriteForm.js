import React, { Component } from 'react'

export class FavoriteForm extends Component {


    // favoriteHandler = (e) => {
    //     e.preventDefault()

    //     let favWorkout = {
    //         user_id: this.props.user.id,
    //         workout_id: this.props.workout.id
    //     }
        
    //     let reqPack = {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${localStorage.token}`,
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify(favWorkout)

    //      }

    //      fetch("http://localhost:3000/favorites", reqPack)
    //         .then(res => res.json())
    //         .then(favWorkout => {
    //             this.props.favWorkout(favWorkout)
    //         })
    // }
    
    render() {
        return (
            <div>
                {/* <button onClick={this.favoriteHandler}>Add To Favorite</button> */}
            </div>
        )
    }
}

export default FavoriteForm;

