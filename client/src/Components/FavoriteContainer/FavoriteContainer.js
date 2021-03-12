import { Component } from "react";

import FavoriteCard from './FavoriteCard'

class FavoriteContainer extends Component{


    render(){
        return(
            <div className="container">
                {this.props.userWorkouts.map(workout => <FavoriteCard user={this.props.user} completeWorkout={this.props.completeWorkout} workout={workout} key={workout.id}/>)}
               
            </div>
        )
    }
}
export default FavoriteContainer;
