import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import HomeLopTruong from "./HomeLopTruong";
//css
import "./css/bootstrap.css";
import "./css/dashboard.css";

//JS Components
import Login from "../Login";
class OpenDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      role: this.props.role,
      data: this.props.data,

      pointID: this.props.data.id,

      point1: this.props.data.point1,
      point2: this.props.data.point2,
      point3: this.props.data.point3,

      point1Monitor: this.props.data.point1,
      point2Monitor: this.props.data.point2,
      point3Monitor: this.props.data.point3,
      messageFromStudent: this.props.data.message,
      isTheSame: true,
      messageNew: null
    };
    this.handlePoint1Monitor = this.handlePoint1Monitor.bind(this);
    this.handlePoint2Monitor = this.handlePoint2Monitor.bind(this);
    this.handlePoint3Monitor = this.handlePoint3Monitor.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.checkSame = this.checkSame.bind(this);
    this.sendToTeacher = this.sendToTeacher.bind(this);
    this.sendToStudent = this.sendToStudent.bind(this);
  }
  sendToTeacher() {
    if (this.checkSame()) {
      axios
        .post(
          "https://training-point.herokuapp.com/verify",
          {
            point_id: this.state.pointID,
            point1: this.state.point1,
            point1_monitor: this.state.point1Monitor,
            point2: this.state.point2,
            point2_monitor: this.state.point2Monitor,
            point3: this.state.point3,
            point3_monitor: this.state.point3Monitor,
            message: this.state.messageNew
          },
          { headers: { token: this.state.token } }
        )
        .then(response => {
          if (response.data.status === "success") {
            console.log("success");
            alert("Đã gửi cho giáo viên.");
            ReactDOM.render(
              <HomeLopTruong role={this.state.role} token={this.state.token} />,
              document.getElementById("root")
            );
          } else {
            alert("có lỗi xảy ra");
          }
          //console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert("Các điểm không trùng khớp, mời làm lại.");
    }
  }

  sendToStudent() {
    if (this.checkSame()) {
      alert("Các điểm đã trùng khớp, không thể từ chối");
    } else {
      if (this.state.messageNew == null) {
        alert("Bạn chưa ghi lý do từ chối.");
      } else {
        axios
          .post(
            "https://training-point.herokuapp.com/reject",
            {
              point_id: this.state.pointID,
              // point1: this.state.point1,
              point1_monitor: this.state.point1Monitor,
              // point2: this.state.point2,
              point2_monitor: this.state.point2Monitor,
              // point3: this.state.point3,
              point3_monitor: this.state.point3Monitor,
              message: this.state.messageNew
            },
            { headers: { token: this.state.token } }
          )
          .then(response => {
            //console.log(response);
            if (response.data.status === "success") {
              alert("Đã gửi cho sinh viên");
              ReactDOM.render(
                <HomeLopTruong
                  role={this.state.role}
                  token={this.state.token}
                />,
                document.getElementById("root")
              );
            } else {
              alert("có lỗi xảy ra");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }

  checkSame() {
    // eslint-disable-next-line
    if (this.state.data.point1 == this.state.point1Monitor) {
      // eslint-disable-next-line
      if (this.state.data.point2 == this.state.point2Monitor) {
        // eslint-disable-next-line
        if (this.state.data.point3 == this.state.point3Monitor) {
          // eslint-disable-next-line
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  componentDidMount() {
    console.log(this.state.data);
    console.log(this.state.token);
    console.log(this.state.pointID);
    if (this.props.data.point1_monitor != null) {
      this.setState({
        point1Monitor : this.props.data.point1_monitor
      })
    }
    if (this.props.data.point2_monitor != null) {
      this.setState({
        point2Monitor : this.props.data.point2_monitor
      })
    }if (this.props.data.point3_monitor != null) {
      this.setState({
        point3Monitor : this.props.data.point3_monitor
      })
    }

  }

  validatePoint(point) {
    if (point < 0) {
      return 0;
    } else if (point >= 100) {
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
    //console.log(this.state.messageNew);
  }

  handlePoint1Monitor(event) {
    let point = this.validatePoint(event.target.value);
    this.setState({
      point1Monitor: point
    });
  }

  handlePoint2Monitor(event) {
    let point = this.validatePoint(event.target.value);
    this.setState({
      point2Monitor: point
    });
  }
  handlePoint3Monitor(event) {
    let point = this.validatePoint(event.target.value);
    this.setState({
      point3Monitor: point
    });
  }

  signOut() {
    localStorage.removeItem("role");
    ReactDOM.render(<Login />, document.getElementById("root"));
  }

  render() {
    console.log("ren");

    return (
      <div>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
            Monitor's Home
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="" onClick={this.signOut}>
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
                    <a className="nav-link active" href="">
                      Quay về
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">Phiếu điểm cần phê duyệt</h1>
              </div>
              <h5>Họ và tên: {this.state.data.user_name}</h5>
              <h6>Ghi chú: {this.state.messageFromStudent}</h6>
              <div id="main-monitor">
                <table className="table table-hover">
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
                      <td>{this.state.data.point1}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput1"
                          value={this.state.point1Monitor}
                          onChange={this.handlePoint1Monitor}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Điểm rèn luyện</td>
                      <td>{this.state.data.point2}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput1"
                          value={this.state.point2Monitor}
                          onChange={this.handlePoint2Monitor}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Điểm ngoại khóa</td>
                      <td>{this.state.data.point3}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput1"
                          value={this.state.point3Monitor}
                          onChange={this.handlePoint3Monitor}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="container">
                  <div className="row">
                    <div className="col-sm-4">
                      <h5>Viết nhận xét</h5>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Nhận xét"
                        onChange={this.handleMessage}
                      />
                    </div>
                    <div className="col-sm-2" />
                    <div className="col-sm-6">
                      <div class="container">
                        <div class="row">
                        <div class="col-sm">
                          <div class="col-sm"> </div>
                            <br />
                            <button
                              type="button"
                              class="btn btn-success"
                              onClick={this.sendToTeacher}
                            >
                              Xác nhận
                            </button>
                          </div>
                          <div class="col-sm">
                            <br />
                            <button
                              type="button"
                              onClick={this.sendToStudent}
                              class="btn btn-danger"
                            >
                              Từ chối
                            </button>
                          </div>
                        </div>
                      </div>

                      <br />
                    </div>
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
export default OpenDocument;
