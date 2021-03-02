import './App.css';
import { Component } from 'react';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import MainContainer from './Components/MainContainer/MainContainer'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';




class App extends Component {

    state = {
      user: {},
      loggedIn: false
    };

    // A common approach to holding active/current user data on the front end is to have a user or currentUser state
  //that is populated with the user returned from your login function, then stating loggedIn set to true.

    setCurrentUser = (user) => {
      this.setState({
        user: user,
        loggedIn: true
      });
    };

    // logOut function clears our state of our user, sets our logged in status to false, and removes our token
    logOut = () => {
      this.setState({ user: {}, loggedIn: false });
      // If you open the devTools in chrome, check out the application tab and look at the LocalStorage section.
      // You can see where our token will be (or is currently) stored. The log out simply sets that token to an empty string,
      //    sets active user state as an empty object, and sets our loggedIn status to false.
      localStorage.token = "";
    };
    // This is a conditiional render that checks if there is a user logged in and, if so, it has a display of their name.
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
            <h2>Sorry, But we don't know you...</h2>
            <h3>Please log in below!</h3>
          </div>
        );
      }
    };
    //During the component did mount I check if there is a viable token present and it's lenght is more
    // than an empty string, and then use it in my tokenLogin function.
    componentDidMount = () => {
      let token = localStorage.token;
      if (typeof token !== "undefined" && token.length > 1) {
        this.tokenLogin(token);
      } else {
        console.log("No token found, try logging in!")
      }
    };

    // This is the function to log in automatically if there is a token saved locally, it's connected to my
    //    auto_login method in my auth controller in the backend. This enables the user to return to the site
    //    and be logged in automatically until they manually log out or clear their localStorage.
    tokenLogin = (token) => {
      
      let reqPack = {
        method: "POST",
        header: { 
          Accept: "application/json", 
          "Content-type": "application/json"
        },
        body: JSON.stringify({token: token})
      }
      fetch("http://localhost:3000/auto_login", reqPack)
        .then((r) => r.json())
        .then((user) => this.setCurrentUser(user));
    }


  render(){
    return (
      <div className="main-div">
        {this.displayGreeting()}
        <BrowserRouter>
         {/* Straightforward use of the <Link/> component from react-router, it MUST be inside a BrowserRouter or it's children components */}
         <Link className="link" to="/login"> Login </Link>

         <span className="link">----||||----</span>

         <Link className="link" to="/signup"> SignUp </Link>
         <br/>
         {/* This looks a little fancy, but I added a ternary to check if a user was logged in */}
         {/* If they were, I rendered a button to let a user log out */}
            {this.state.loggedIn ? (
              <span className="link">
                <br/>
                <button onClick={this.logOut}>Log Out</button>
              </span>
            ) : null }
            <br/>

            <Link className="link" to="/"> Home</Link>
            <br/>

            <Link className="link" to="/auth">
              Auth Check{" "}
              {!this.state.loggedIn ? "(works better if you're Logged In!)" : "(Try it now, you're logged in!)"}
            </Link>{" "}
            <br/>

            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>

              {/* I added a check in the login and signup path, if a user is logged in it redirects to the home page instead of login */}

              <Route exact path="/login">
                {this.state.loggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Login setCurrentUser={this.setCurrentUser}/>
                )}
              </Route>

              <Route exact path="/signup">
                {this.state.loggedIn ? <Redirect to="/" /> : <SignUp/>}
              </Route>

              <Route exact path="/main">
                <MainContainer loggedIn={this.state.loggedIn} />
              </Route>
            </Switch>


        </BrowserRouter>
       
      </div>
    );
  }
}

export default App;
