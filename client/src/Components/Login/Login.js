import { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
    // The only state "required" for this component is the username and password for the controlled form.

    state = {
        email: "",
        password: "",
        errorMessage: ""
    };

    
    handleChange = (event) =>{
        const { name, value } = event.target;
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
                
            if (response.user){
                this.props.setCurrentUser(response.user);
                localStorage.token = response.jwt;
            }else{
                this.setState({errorMessage: response.message})
            }
            })

    }

    render(){
        return(
            <div>
              <p>{this.state.errorMessage}</p>
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