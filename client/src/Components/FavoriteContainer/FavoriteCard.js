import {Component} from 'react';
import ReactPlayer from 'react-player'


class FavoriteCard extends Component{

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



    favoriteHandler = () => {
        
       let  workout = this.props.workout
       
        let completeWorkout = {
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
            body: JSON.stringify(completeWorkout)

         }

         fetch("http://localhost:3000/favorite_delete", reqPack)
            .then(res => res.json())
            .then(completeWorkout => {
                this.props.completeWorkout(workout)
            })
    }

    render(){
        let {name, description, image, video} = this.props.workout
        
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
                    {/* {console.log(this.props.workout.muscles)} */}
                <div>
                    {this.state.showVideo && <ReactPlayer url={video} width='25%'  controls/>}
                    <button onClick={this.toggleVideo}>Watch How-To</button>
                </div>
                <div>
                    <button onClick={() => this.favoriteHandler()}>Complete</button>
                </div>
                    
            </div>
        )
    }
}

export default FavoriteCard;
