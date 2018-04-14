import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-5 col-md-3">
                        <div className="form-login">
                            <h4>UET-Training Point</h4>
                            <input type="text" id="userName" className="form-control input-sm chat-input" placeholder="username" value={this.state.value} onChange={this.handleChange} />
                            <br/>
                            <input type="password" id="userPassword" className="form-control input-sm chat-input" placeholder="password" />
                            <br/>
                            <div className="wrapper">
                                <span className="group-btn">     
                                    <a type="submit" href="" className="btn btn-primary btn-md" onClick={this.handleSubmit}>
                                        Login
                                        <i className="fa fa-sign-in" />
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;