import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
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
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="wrap">
                            <p class="form-title">
                                Login</p>
                            <form class="login">
                            <input type="text" placeholder="Username" />
                            <input type="password" placeholder="Password" />
                            <input type="submit" value="Sign In" class="btn btn-success btn-sm" />
                            <div class="remember-forgot">
                                <div class="row">
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="posted-by">Author: <a href="fb.com/Ng.Chien96">Vis10n</a></div>
            </div>
        );
    }
}
export default Login;