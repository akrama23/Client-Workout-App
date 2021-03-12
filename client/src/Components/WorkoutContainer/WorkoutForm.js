import React, { Component } from 'react'

export class WorkoutForm extends Component {

    state = {
        name: "",
        description: "",
        image: "",
        video: "",
        chosenMuscles: []
    }

    handleCheck = (checkedMuscle) => {
        const muscles = this.state.chosenMuscles
        muscles.includes(checkedMuscle)
        ? this.setState({chosenMuscles: muscles.filter(muscle => muscle !== checkedMuscle)})
        : this.setState({chosenMuscles: [...muscles, checkedMuscle]})
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }
    handleForm = (e) => {
        e.preventDefault();

        let newWorkout = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            video: this.state.video
        }
        let reqPack = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "POST",
            body: JSON.stringify(newWorkout)
        }

        fetch("http://localhost:3000/workouts",reqPack)
            .then(r => r.json())
            .then(newWorkoutData => {
            this.createJoiner(newWorkoutData)
            this.props.addWorkout(newWorkoutData)
            e.target.reset()
            })
    }

    createJoiner = (newWorkout) => {
        const updatedWorkout = newWorkout
        const targetMuscles = []
        updatedWorkout.target_muscles = targetMuscles
        this.state.chosenMuscles.map(muscle => {
            const newTargetMuscle = {
                workout_id: newWorkout.id,
                muscle_id: muscle.id
            }

            const reqPack = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "POST",
                body: JSON.stringify(newTargetMuscle)
            }
            fetch("http://localhost:3000/target_muscles", reqPack)
                .then(r => r.json())
                .then(targetMuscle => {
                    targetMuscles.push(targetMuscle)
                    this.props.addTargetMuscles(updatedWorkout)
                })
        })
    }



    render() {
        return (
            <div>
                <form onSubmit={(e)=>this.handleForm(e)}>
                    <label>Workout Name: </label><br/>
                    <input onChange={this.handleInput} type="text" name="name" placeholder="Workout Name..."/>
                        <br/>
                    <label> Description:</label><br/>
                    <input onChange={this.handleInput} type="text" name="description" placeholder="description..."/>
                        <br/>
                    <label>Image:</label> <br/>
                    <input onChange={this.handleInput} type="text" name="image" placeholder="Image URl..."/>
                        <br/>
                    <label>Video: </label><br/>
                    <input onChange={this.handleInput} type="text" name="video" placeholder="Youtube Video..."/>
                        <br/>
                        <label> Add Targeted Muscles: </label><br/> 
                        {this.props.muscles.map(muscle => <label key={muscle.id}><input onChange={()=>this.handleCheck(muscle)}type="checkbox" key={muscle.id} name="muscle" value={muscle.name}/>{muscle.name}<br/></label>)}
                        <br/>
                    <input type="submit" value="Create" />
                        <br/>

                </form>
            </div>
        )
    }
}

export default WorkoutForm;
