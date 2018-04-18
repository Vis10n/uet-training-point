import React, { Component } from "react";
import "./HomeSinhVien.css";
import ReactDOM from "react-dom";
import Login from "../Login";
import axios from "axios";

class HomeSinhVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      role: this.props.role,
      usename: this.props.usename,

      pointId: null,
      point1Student: 0,
      point2Student: 0,
      point3Student: 0,
      point1Monitor: 0,
      point2Monitor: 0,
      point3Monitor: 0,
      message: null,
      messageNew: null,
      student_verify: false,
      monitor_verify: false,
      teacher_verify: false,

      submit: false
    };
    this.signOut = this.signOut.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.ShowInfo = this.ShowInfo.bind(this);
    this.handlePoint1 = this.handlePoint1.bind(this);
    this.handlePoint2 = this.handlePoint2.bind(this);
    this.handlePoint3 = this.handlePoint3.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage(event) {
    this.setState({
      messageNew: event.target.value
    });
    console.log("mess" + this.state.messageNew);
  }
  handlePoint1(event) {
    this.setState({
      point1Student: event.target.value
    });
    console.log("point 1" + this.state.point1Student);
  }
  handlePoint2(event) {
    this.setState({
      point2Student: event.target.value
    });
  }
  handlePoint3(event) {
    this.setState({
      point3Student: event.target.value
    });
  }

  ShowInfo = data => {
    console.log(data);
  };

  componentDidMount() {
    //check da lam don chua tai day
    console.log("đimount");
    console.log("token " + this.state.token);
    console.log("role " + this.state.role);
    // console.log("usename " + this.state.usename);

    axios
      .get("https://training-point.herokuapp.com/get_form", {
        headers: { token: this.state.token }
      })
      .then(response => {
        let data = response.data.point;
        console.log(data);

        this.setState({
          pointId: data.id,
          point1Student: data.point1,
          point2Student: data.point2,
          point3Student: data.point3,
          point1Monitor: data.point1_monitor,
          point2Monitor: data.point2_monitor,
          point3Monitor: data.point3_monitor,
          message: data.message,
          student_verify: data.student_verify,
          monitor_verify: data.monitor_verify,
          teacher_verify: data.monitor_verify
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  sendInfo() {
    axios
      .post(
        "https://training-point.herokuapp.com/submit",

        {
          point_id: this.state.pointId,
          point1: this.state.point1Student,
          point2: this.state.point2Student,
          point3: this.state.point3Student,
          message: this.state.messageNew
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  signOut() {
    console.log(localStorage.getItem("role"));
    localStorage.removeItem("role");
    console.log(localStorage.getItem("role"));
    ReactDOM.render(<Login />, document.getElementById("root"));
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
            UET training point
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" onClick={this.signOut} href="">
                Sign out
              </a>
            </li>
          </ul>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link">Thông báo</a>
                  </li>
                </ul>
              </div>
            </nav>

            <main
              role="main"
              className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
            >
              {/* <h2>Điểm rèn luyện</h2> */}

              <h5>Trạng thái đơn</h5>
              <br />
              <p>
                {" "}
                Lớp trưởng:{" "}
                {this.state.monitor_verify
                  ? "đã xác nhận"
                  : "chưa xác nhận"}{" "}
              </p>
              <p>
                {" "}
                Cố Vấn học tập:{" "}
                {this.state.teacher_verify
                  ? "đã xác nhận"
                  : "chưa xác nhận"}{" "}
              </p>
              <br />
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Danh sách điểm rèn luyện</th>
                      <th scope="col">Sinh viên điền</th>
                      <th scope="col">Lớp trưởng điền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Điểm học tập</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput1"
                          value={this.state.point1Student}
                          onChange={this.handlePoint1}
                        />
                      </td>
                      <td>{this.state.point1Monitor}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Điểm rèn luyện</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput1"
                          value={this.state.point2Student}
                          onChange={this.handlePoint2}
                        />
                      </td>
                      <td>{this.state.point2Monitor}</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Điểm ngoại khóa</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput1"
                          value={this.state.point3Student}
                          onChange={this.handlePoint3}
                        />
                      </td>
                      <td>{this.state.point3Monitor}</td>
                    </tr>
                  </tbody>
                </table>
                <p>Ghi chú: {this.state.message}</p>
                <p>
                  Viết nhận xét{" "}
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    onChange={this.handleMessage}
                  />
                </p>

                <br />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.sendInfo}
                >
                  Gửi cho lớp trưởng
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeSinhVien;
