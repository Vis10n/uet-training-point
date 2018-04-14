import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-offset-5 col-md-3">
            <div className="form-login">
              <h4>UET-Training Point</h4>
              <input type="text" id="userName" className="form-control input-sm chat-input" placeholder="username" />
              <br/>
              <input type="text" id="userPassword" className="form-control input-sm chat-input" placeholder="password" />
              <br/>
              <div className="wrapper">
                <span className="group-btn">     
                  <a href="" className="btn btn-primary btn-md" onClick={activeLaser} >login <i className="fa fa-sign-in"></i></a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

function activeLaser() {
  console.log(document.getElementById("userName").textContent)
}