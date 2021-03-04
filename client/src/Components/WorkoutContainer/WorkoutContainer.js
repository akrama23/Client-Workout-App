import { Component } from 'react';
import WorkoutCard from './WorkoutCard'

class WorkoutContainer extends Component {
    
   



    render(){
        return(

            <div>
              {this.props.workouts.map(workout => <WorkoutCard workout={workout} user={this.props.user} favWorkout={this.props.favWorkout} key={workout.id}/>)}
            </div>
        )
    }
}

export default WorkoutContainer;
