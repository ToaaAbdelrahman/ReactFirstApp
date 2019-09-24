import React, { Component } from 'react';
import './App.css';
import { Auth } from "aws-amplify";




// import route Components here
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
 

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }
 showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }
  render() {

    return (
	
      <div>
	  <div className="box-controller">
       <div
         className={"controller " + (this.state.isLoginOpen
         ? "selected-controller"
         : "")}
         onClick={this
         .showLoginBox
         .bind(this)}>
         Login
       </div>
       <div
         className={"controller " + (this.state.isRegisterOpen
         ? "selected-controller"
         : "")}
         onClick={this
         .showRegisterBox
         .bind(this)}>
         Register
       </div>
     </div>
      <div className="box-container">
      {this.state.isLoginOpen && <LoginBox/>}
      {this.state.isRegisterOpen && <RegisterBox/>}
     </div>
	 
      </div>
    );
  }
}

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
     handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
	
	  try {
    await Auth.signIn(this.state.email, this.state.password);
    alert("Logged in");
  } catch (e) {
    alert(e.message);
  }
  }
  submitLogin(e) {}

  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder=""/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder=""/>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .handleSubmit
            .bind(this)}>Login</button>
        </div>
      </div>
    );
  }

}

//Register Box 
class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  submitRegister(e) {}
 handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.setState({ newUser: "test" });

    this.setState({ isLoading: false });
  }
  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Register
        </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
			  onChange={this.handleChange}/>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email" onChange={this.handleChange}/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
			  onChange={this.handleChange}/>
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={this
            .handleSubmit
            .bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}




export default App;
