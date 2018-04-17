import React, { Component } from "react";
import ReactDOM from "react-dom";

import "../css/Login.css";
import HomeCoVanHocTap from "./coVanHocTap/HomeCoVanHocTap";
import HomeLopTruong from "./lopTruong/HomeLopTruong";
import HomeSinhVien from "./sinhVien/HomeSinhVien";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
    console.log("user" + this.state.username);
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value
    });
    console.log("pass" + this.state.password);
  }

  handleSubmit(event) {
    axios
      .post("https://training-point.herokuapp.com/login", {
        code: this.state.username,
        password: this.state.password
      })
      .then(function(response) {
        console.log(response);
        
        if (response.data.role === "student") {
          ReactDOM.render(
            <HomeSinhVien
              token={response.data.token}
              role={response.data.role}
            />,
            document.getElementById("root")
          );
        } else if (response.data.role === "monitor") {
          ReactDOM.render(
            <HomeLopTruong
              token={response.data.token}
              role={response.data.role}
            />,
            document.getElementById("root")
          );
        } else if (response.data.role === "teacher") {
          ReactDOM.render(
            <HomeCoVanHocTap
              token={response.data.token}
              role={response.data.role}
            />,
            document.getElementById("root")
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-signin">
        <div className="text-center mb-4">
          <img
            className="mb-4"
            src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal">UET training point</h1>
          <p>Team 13 - University of Engineering and Technology</p>
        </div>

        <div className="form-label-group">
          <input
            type="text"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autofocus
            value={this.state.username}
            onChange={this.handleChangeUsername}
          />
          <label for="inputEmail">Username</label>
        </div>

        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
          <label for="inputPassword">Password</label>
        </div>

        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          onClick={this.handleSubmit}
        >
          Login
        </button>
        <p className="mt-5 mb-3 text-muted text-center">
          NguyenTuanAnh - NguyenChuChien - TranMinhChien
        </p>
      </form>
    );
  }
}
export default Login;
