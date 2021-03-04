import React, { Component } from 'react';
import WorkoutContainer from '../WorkoutContainer/WorkoutContainer'


class MainContainer extends Component{

    state = {
        workouts: []
    }

    componentDidMount = () => {

        let reqPack = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            }

        }
        fetch("http://localhost:3000/workouts", reqPack)
            .then(res => res.json())
            .then((workouts) => this.setState({workouts}))  
    }



    render(){
        return(
            <div>
            
                <WorkoutContainer user={this.props.user} favWorkout={this.props.favWorkout} workouts={this.state.workouts}/>
                
            </div>
        )
    }
}

export default MainContainer;