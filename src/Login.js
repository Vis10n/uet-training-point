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
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="wrap">
                            <p className="form-title">
                                Login</p>
                            <form className="login" onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Username" value={this.state.value} onChange={this.handleChange} />
                            <input type="password" placeholder="Password" />
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