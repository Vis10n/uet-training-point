import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }
    
    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit(event) {
        //console.log('A name was submitted: ' + this.state.username);
        
        if (this.state.username === 'Vision' || this.state.password === '123456') {
            alert("Login Successfully!");
        }
        else {
            alert("Username or password is incorrect!");
        }
        event.preventDefault();
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="wrap">
                            <p className="form-title">
                                T-Pointer</p>
                            <form className="login" onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleChangeUsername} />
                            <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
                            <input type="submit" value="Sign In" className="btn btn-success btn-sm" />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="posted-by">Author: <a href="fb.com/Ng.Chien96">Vis10n</a></div>
            </div>
        );
    }
}
export default Login;