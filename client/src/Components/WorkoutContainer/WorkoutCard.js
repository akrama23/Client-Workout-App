import { Component } from 'react';
import ReactPlayer from 'react-player'
import { Redirect } from "react-router-dom";
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'
// import FavoriteForm from '../FavoriteContainer/FavoriteForm'

class WorkoutCard extends Component {
    
    state = {
        showMuscles: false,
        showVideo: false,
        isOpen: false
    }

    toggleMuscles= () => {
        this.setState({
            showMuscles: !this.state.showMuscles
            
        })
    }
    toggleVideo = () => {
        this.setState({
            showVideo: !this.state.showVideo
        })
    }

    favoriteHandler = (e) => {
        e.preventDefault()

        let favWorkout = {
            user_id: this.props.user.id,
            workout_id: this.props.workout.id
        }
        
        let reqPack = {
            method: "POST",
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
    
    render(){

        let { name, description, image, video } = this.props.workout

        return(
            <div className="card">
                <div className="face face1">
                    <div className="content">
                        <img src={image} alt={this.props.workout.name} width="250" height="200"/>
                        <h4>{name}</h4>
                    </div>
                </div>
         
                <div className="face face2">
                    <div className="content">
                        <p>{description}</p>
                        {this.state.showMuscles && this.props.workout.target_muscles.map(target_muscle => <ul key={target_muscle.id}><li>{target_muscle.muscle.name}</li></ul> )}
                        <button onClick={this.toggleMuscles}>Targeted Muscle?</button>
                        {this.state.showVideo && <ReactPlayer url={video} width='75%' height="75%" controls/>}
                        <button onClick={this.toggleVideo}>Watch How-To</button>
                        <button onClick={this.favoriteHandler} >Add To Favorite</button>
                    </div>
                 </div>
            </div>
            )
    }

}
export default WorkoutCard;