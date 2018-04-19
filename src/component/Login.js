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
      password: "",
      role: null
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
  componentDidMount() {
    console.log("didmount Login");
    //console.log(localStorage.getItem("role"));
    let b = localStorage.getItem("role");
    //console.log("b = " + b);

    if (b != null) {
      let a = JSON.parse(localStorage.getItem("role"));
      let role = a[0];
      let token = a[1];
      let username = a[2];
      if (role === "student") {
        ReactDOM.render(
          <HomeSinhVien role={role} token={token} username={username} />,
          document.getElementById("root")
        );
      } else if (role === "monitor") {
        ReactDOM.render(
          <HomeLopTruong role={role} token={token} />,
          document.getElementById("root")
        );
      } else if (role === "teacher") {
        ReactDOM.render(
          <HomeCoVanHocTap role={role} token={token} />,
          document.getElementById("root")
        );
      }
    }
  }

  handleSubmit(event) {
    axios
      .post("https://training-point.herokuapp.com/login", {
        code: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        // var usernameProp = this.state.username;
        // console.log(usernameProp);
        console.log(this.state.username);

        var dataSave = [
          response.data.role,
          response.data.token,
          this.state.username
        ];
        console.log(dataSave[2]);

        localStorage.setItem("role", JSON.stringify(dataSave));

        if (response.data.role === "student") {
          ReactDOM.render(
            <HomeSinhVien
              token={response.data.token}
              role={response.data.role}
              username={this.state.username}
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
    console.log("render");

    return (
      <div className="main-login">
        <form className="form-signin">
          <div className="text-center mb-4">
            <img
              className="mb-4"
              src="https://ih1.redbubble.net/image.481229463.9121/flat,800x800,070,f.u1.jpg"
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
            Authors <br />
            TuanAnhNguyen - ChienNguyenChu - ChienTranMinh
          </p>
        </form>
      </div>
    );
  }
}
export default Login;
