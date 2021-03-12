import './App.css';
import { Component } from 'react';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import MainContainer from './Components/MainContainer/MainContainer'
import FavoriteContainer from './Components/FavoriteContainer/FavoriteContainer'
import Profile from './Components/Profile/Profile'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';




class App extends Component {

    state = {
      user: {},
      userWorkouts: [],
      loggedIn: false
    };

    setCurrentUser = (user) => {
      this.setState({
        user: user,
        userWorkouts: user.workouts,
        loggedIn: true
      });
    };

    
    logOut = () => {
      this.setState({ user: {}, loggedIn: false });
      localStorage.token = "";
    };
   
    displayGreeting = () => {
      if (this.state.loggedIn) {
        return(
          <h1 className="Greeting">
            Welcome back {this.state.user.first_name}!
          </h1>
        );
      }else {
        return (
          <div className="Please-log-in">
            <h4>Please log in below</h4>
          </div>
        );
      }
    };

    componentDidMount = () => {
      let token = localStorage.token;
      if (typeof token !== "undefined" && token.length > 1) {
        this.tokenLogin(token);
      } else {
        console.log("No token found, try logging in!")
      }
    };

    tokenLogin = (token) => {
      const user = {token: token}
      let reqPack = {
        method: "POST",
        header: { 
          Accept: "application/json", 
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      }
      fetch("http://localhost:3000/auto_login", reqPack)
        .then((r) => r.json())
        .then((user) => this.setCurrentUser(user));
    }




    favWorkout = (workout) => {
      this.setState({
          userWorkouts: [workout,...this.state.userWorkouts]
      })
  }

  completeWorkout = (completeWorkout) => {
    // console.log(completeWorkout)
    this.setState({
      userWorkouts: this.state.userWorkouts.filter((workout) => workout !== completeWorkout)
    })
  }

  handleEditForm = (e) => {
    e.preventDefault();
    let userInfo = {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        image: e.target.image.value
    }

    let reqPack = {
        method: "PATCH",
        headers: {"Authorization": `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"},
        body: JSON.stringify(userInfo)
    }

    fetch(`http://localhost:3000/users/${this.state.user.id}`, reqPack)
        .then(r => r.json())
        .then(newUserInfo => {
          this.setState({...this.state, user: newUserInfo})
        })
}

  render(){
    return (

      <div className="main-div-container">
        <div className="content-wrap">
        {this.displayGreeting()}
        <BrowserRouter>
        
         <Link className="link" to="/login"> Login </Link>

         <span>----||||----</span>
          <Link className="link" to="/signup"> SignUp </Link>
         
         <br/>
      
            {this.state.loggedIn ? (
              <span className="link">
                <br/>
                <button onClick={this.logOut}>Log Out</button>
              </span>
            ) : null }
            <br/>

            {this.state.loggedIn ? (
            <Link className="link" to="/favorites"> Favorite Workouts</Link> 
            ) : null }
            <br/>
            {this.state.loggedIn ? (
            <Link className="link" to="/profile"> Profile</Link> 
            ) : null }
            <br/>

            <Link className="link" to="/"> Home</Link>
            <br/>
            {this.state.loggedIn ? (<Link className="link" to="/workouts">Workouts</Link>
            ) : null}
            
            <br/>

            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>

              <Route exact path="/login">
                {this.state.loggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Login setCurrentUser={this.setCurrentUser}/>
                )}
              </Route>
              <Route exact path="/profile">
                <Profile updatedUser={this.updatedUser} handleEditForm={this.handleEditForm} user={this.state.user} setCurrentUser={this.setCurrentUser}/>
              </Route>

              <Route exact path="/signup">
                {this.state.loggedIn ? <Redirect to="/" /> : <SignUp/>}
              </Route>

              <Route exact path="/workouts">
                <MainContainer favWorkout={this.favWorkout} user={this.state.user} loggedIn={this.state.loggedIn} />
              </Route>

              <Route exact path="/favorites">
                <FavoriteContainer user={this.state.user} userWorkouts={this.state.userWorkouts} completeWorkout={this.completeWorkout} loggedIn={this.state.loggedIn} />
              </Route>
            </Switch>
          </BrowserRouter>
          </div>

          <Footer/>
      </div>
    );
  }
}

export default App;
