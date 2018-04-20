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
      username: this.props.username,

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
      teacher_verify: false
    };
    this.signOut = this.signOut.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.ShowInfo = this.ShowInfo.bind(this);
    this.handlePoint1 = this.handlePoint1.bind(this);
    this.handlePoint2 = this.handlePoint2.bind(this);
    this.handlePoint3 = this.handlePoint3.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  validatePoint(point) {
    if (point < 0) {
      return 0;
    } else if (point > 100) {
      return 100;
    } else {
      return point;
    }
  }

  validateMess(mess) {
    return mess.trim();
  }

  handleMessage(event) {
    let mess = this.validateMess(event.target.value);
    this.setState({
      messageNew: mess
    });
  }
  
  handlePoint1(event) {
    let point = this.validatePoint(event.target.value);
    this.setState({
      point1Student: point
    });
    //console.log("point 1" + this.state.point1Student);
  }
  handlePoint2(event) {
    let point = this.validatePoint(event.target.value);
    this.setState({
      point2Student: point
    });
  }
  handlePoint3(event) {
    let point = this.validatePoint(event.target.value);
    this.setState({
      point3Student: point
    });
  }

  ShowInfo = data => {
    //console.log(data);
  };

  getAPI() {
    console.log("getapi");

    axios
      .get("https://training-point.herokuapp.com/get_form", {
        headers: { token: this.state.token }
      })
      .then(response => {
        let data = response.data.point;
        //console.log(data);

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
          teacher_verify: data.monitor_verify,
          student_name: data.user_name
        });
        //console.log("get done");
      })
      .catch(function(error) {
        console.log(error);
      });
    
  }

  validateSendInfo(point1, point2, point3) {
    if (point1 > 0 && point1 <= 100) {
      if (point2 > 0 && point2 <= 100) {
        if (point3 > 0 && point3 <= 100) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  sendInfo() {
    //console.log("post");
    let condition = this.validateSendInfo(
      this.state.point1Student,
      this.state.point2Student,
      this.state.point3Student
    );
    if (condition) {
      axios
        .post(
          "https://training-point.herokuapp.com/submit",
          {
            point_id: this.state.pointId,
            point1: this.state.point1Student,
            point2: this.state.point2Student,
            point3: this.state.point3Student,
            message: this.state.messageNew
          },
          { headers: { token: this.state.token } }
        )
        .then(response => {
          //console.log(response.status);
          if (response.status === 200) {
            alert("Đã gửi thành công.");
            this.getAPI();
          } else {
            alert("Mời bạn điền lại");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert("Mời bạn điền lại");
    }
  }

  componentDidMount() {
    //check da lam don 
    //console.log("didmount");
    //console.log("token " + this.state.token);
    //console.log("role " + this.state.role);
    //console.log("username " + this.state.username);

    this.getAPI();
  }

  signOut() {
    //console.log(localStorage.getItem("role"));
    localStorage.removeItem("role");
    //console.log(localStorage.getItem("role"));
    ReactDOM.render(<Login />, document.getElementById("root"));
  }

  render() {
    const inputPoin1 = this.state.student_verify ? (
      this.state.point1Student
    ) : (
      <input
        type="number"
        className="form-control"
        id="exampleFormControlInput1"
        value={this.state.point1Student}
        onChange={this.handlePoint1}
      />
    );

    const inputPoin2 = this.state.student_verify ? (
      this.state.point2Student
    ) : (
      <input
        type="number"
        className="form-control"
        id="exampleFormControlInput1"
        value={this.state.point2Student}
        onChange={this.handlePoint2}
      />
    );

    const inputPoin3 = this.state.student_verify ? (
      this.state.point3Student
    ) : (
      <input
        type="number"
        className="form-control"
        id="exampleFormControlInput1"
        value={this.state.point3Student}
        onChange={this.handlePoint3}
      />
    );

    const inputComment = this.state.student_verify ? null : (
      <div>
        <p>Viết nhận xét</p>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={this.handleMessage}
        />
        <br />
        <button
          type="button"
          className="btn btn-success"
          onClick={this.sendInfo}
        >
          Gửi cho lớp trưởng
        </button>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
            Student's Home
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
                    <a className="nav-link">Sinh Viên</a>
                  </li>
                </ul>
              </div>
            </nav>

            <main
              role="main"
              className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
            >
              <h4>
                Họ tên : {this.state.student_name} - {this.state.username}
              </h4>
              <br />
              <h5>Trạng thái phiếu điểm</h5>
              <br />

              <p>
                {" "}
                Sinh viên:{" "}
                {this.state.student_verify ? "đã gửi đơn" : "chưa gửi đơn"}{" "}
              </p>
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
              <p>Ghi chú: {this.state.message}</p>
              <br />
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Thành phần điểm</th>
                      <th scope="col">Sinh viên điền</th>
                      <th scope="col">Lớp trưởng điền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Điểm học tập</td>
                      <td>{inputPoin1}</td>
                      <td>{this.state.point1Monitor}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Điểm rèn luyện</td>
                      <td>{inputPoin2}</td>
                      <td>{this.state.point2Monitor}</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Điểm ngoại khóa</td>
                      <td>{inputPoin3}</td>
                      <td>{this.state.point3Monitor}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-8">{inputComment}</div>
                    <div className="col-sm-2" />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeSinhVien;
