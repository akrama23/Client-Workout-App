import { Component } from 'react';
import ReactPlayer from 'react-player'
import FavoriteForm from '../FavoriteContainer/FavoriteForm'

class WorkoutCard extends Component {

    state = {
        showMuscles: false,
        showVideo: false
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
    
    render(){

        let { name, description, image, video } = this.props.workout

        return(
            <div>
                <div>
                    <h4>{name}</h4>
                </div>
                
                <div>
                    <img src={image} alt={this.props.workout.name} width="250" height="200"/>
                </div>

                <div>
                    <p>{description}</p>
                </div>
                ==============
                <div>          
                    {this.state.showMuscles && this.props.workout.muscles.map(muscle => <p key={muscle.id}>{muscle.name}</p> )}
                    <button onClick={this.toggleMuscles}>Targeted Muscle?</button>
                </div>
                ==============      
                <div>
                    {this.state.showVideo && <ReactPlayer url={video} width='25%'  controls/>}
                    <button onClick={this.toggleVideo}>Watch How-To</button>
                </div>
                ==============
                <div>
                    <FavoriteForm user={this.props.user} workout={this.props.workout} favWorkout={this.props.favWorkout}/>
                </div>

            </div>
            )
    }

}
export default WorkoutCard;