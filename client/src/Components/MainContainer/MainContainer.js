import React, { Component } from 'react';
import WorkoutContainer from '../WorkoutContainer/WorkoutContainer'
import WorkoutForm from '../WorkoutContainer/WorkoutForm'
import Search from '../Search/Search'

class MainContainer extends Component{

    state = {
        workouts: [],
        muscles: [],
        search: "",
        showForm: false 
    }

    componentDidMount = () => {

        // let reqPack = {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.token}`,
        //         "Content-Type": "application/json",
        //         Accept: "application/json"
        //     }
        // }
        Promise.all([
            fetch("http://localhost:3000/workouts").then(res => res.json()),
            fetch("http://localhost:3000/muscles").then(r => r.json()) 
        ]).then(([workoutsData, musclesData]) => {
            this.setState({
                workouts: workoutsData,
                muscles: musclesData
            })
        })
        
    }
        

    addWorkout = (workout) => {
        this.setState({ workouts: [workout,...this.state.workouts]})
    }

    addTargetMuscles = (updatedWorkout) => {
        this.setState({ workouts: this.state.workouts.map(workout => workout.id === updatedWorkout.id ? updatedWorkout : workout)})
    }

    handleSearch = (search) => {
        this.setState({search})
    }

    displayWorkout = () => this.state.workouts.filter(workout => workout.name.toLowerCase().includes(this.state.search.toLowerCase()))

    toggleForm= () => {
        this.setState({
            showForm: !this.state.showForm
            
        })
    }


    render(){
        // {console.log(this.state.muscles)}
        return(
            <div className="main-container">
                    <Search handleSearch={this.handleSearch}/>
               
                    <WorkoutContainer user={this.props.user} favWorkout={this.props.favWorkout} workouts={this.displayWorkout()}/>
               
                    {this.state.showForm && <WorkoutForm addTargetMuscles={this.addTargetMuscles} addWorkout={this.addWorkout} muscles={this.state.muscles}/>}
                    <button onClick={this.toggleForm}>Add New Workout</button>
                
            </div>
        )
    }
}

export default MainContainer;