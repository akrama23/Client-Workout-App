import { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
    // The only state "required" for this component is the username and password for the controlled form.

    state = {
        email: "",
        password: ""
    };

    //This is just our controlled form handleChange event listener used to take in our login form
    //info and save it to state for us to use with our fetches, using a little destructuring to create variables
    handleChange = (event) =>{
    // this would be like saying the following
    // let name = event.target.name
    // let value = event.target.value
        const { name, value } = event.target;

    // For using a variable in setting the key in state you *need* to use a square bracket
    //  This allows you to pull the value from the variable instead setting the key as "name"
        this.setState({
            [name]: value
        })
    }

    //The login function, take note the endpoint it is targeting and what it is sending in
    //   This is DIRECTLY related to how you set up your back end routes and methods
    login = (event) => {
        event.preventDefault()
        // Because our form values are stored in state, we can immediately clear the form on submit
        event.target.reset();

        // Example of destructuring the state into variables
        const { email, password } = this.state;
        // This follows our login route we specified in our backend
        const user = { email, password };

        let reqPack = { 
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({user})
        }

        fetch("http://localhost:3000/login", reqPack)
            .then((r) => r.json())
            .then((response) => {
                console.log(response)
                // The token below will be used as a header for Authorization in your fetches
                // I packaged the token into our response from the login method in our backend
                //and immediately save it locally (if you open your application tab in chrome devTools
                //and look at your local storage and you should see it after a successful login!)
                if (response.user){
                this.props.setCurrentUser(response.user);
                localStorage.token = response.jwt;
                //The line below should also work, if you ever see this syntax
                // localStorage.setItem("token", response.jwt)
                //Below I use the prop function of setCurrentUser to pass up my user, setting my user state in App
                //and a loggedIn state of true on successful login
            }else{
                console.log(response.message)
            }
            })

    }

    render(){
        return(
          
          <div>
              <form onSubmit={this.login}>
                   <br/>
                   <label>
                       Email:
                       <br/>
                   <input 
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                  />
                  </label>
                    <br/>
                    <label>
                        Password:
                        <br/>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                    </label>
                    <br/>
                    <br/>
                <button type="submit">Submit</button>
              </form>
                <br/>
                <br/>
          </div>
        )
    }
}

export default Login;