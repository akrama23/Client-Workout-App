import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

class SignUp extends Component {

   // State is used for a controlled form on User creation
  //If you wanted to do a password confirmation you can also choose to do the logic here to check if
  //password and passwordConfirmation match before sending the POST
  state = {
      first_name: "",
      last_name: "",
      image: "",
      email: "",
      password: "",
      created: false,
      errorMessage: ""
  }

  // Handle change event listener with a clean destructuring for value/name
  handleChange = (event) => {
      const { name, value} = event.target;

      this.setState({
          [name]: value
      })
  }

  // Create user function, fairly straightforward POST
  createUser = (event) => {
      event.preventDefault();
      // Since data is stored in state you can clear the form immediately on submit
      event.target.reset();
      const {first_name, last_name, image, email, password} = this.state;

      let user = {
          first_name: first_name,
          last_name: last_name,
          image: image,
          email: email,
          password: password
      }

      let reqPack = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({user})
      }

      fetch("http://localhost:3000/users", reqPack)
        .then((r) => r.json())
        .then((response) => {
            // We are reciving a status of "created" if the user is valid and saved to the database
            // This also shows how you can interact with the status of a response
            // One *could* set some conditional effects on their site depending on if state.created is true
            if (response.status === "created") {
                this.setState({ created: true, errorMessage: "" });
            }
        })
        // This error message triggers if the fetch does NOT work
        .catch(response => this.setState({errorMessage: "Woah it Broke, Check Server!!"}))
  }

    render() {
        return(
            <div>
                {this.state.create ? (
                    <Redirect to="/login" />
                ) : (
                    <div>
                        <div className="please-log-in"><p>{this.state.errorMessage}</p></div>
                        <br/>
                        <form onSubmit={this.createUser}>
                            <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            onChange={this.handleChange}
                            />
                            <br/>

                            <input
                            type="text"
                            name="last_Name"
                            placeholder="Last Name"
                            onChange={(e) => this.handleChange(e)}
                            />
                            <br/>

                            <input
                            type="text"
                            name="image"
                            placeholder="Paste Image URL.."
                            onChange={(e) => this.handleChange(e)}
                            />
                            <br/>

                            <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => this.handleChange(e)}
                            />
                            <br/>

                            <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => this.handleChange(e)} 
                            />
                            <br/>
                            <br/>
                            
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                
                )}

                <br/>
                <br/>
            </div>
        );
    }
}

export default SignUp;