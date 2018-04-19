import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

//css
import "./css/bootstrap.css";
import "./css/dashboard.css";

//JS Components
import Login from "../Login";
class HomeLopTruong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      role: this.props.role,
      data: this.props.data,

      point1Monitor: this.props.data.point1,
      point2Monitor: this.props.data.point2,
      point3Monitor: this.props.data.point3,
      messageFromStudent: this.props.data.message
    };
    this.handlePoint1Monitor = this.handlePoint1Monitor.bind(this);
    this.handlePoint2Monitor = this.handlePoint2Monitor.bind(this);
    this.handlePoint3Monitor = this.handlePoint3Monitor.bind(this);
  }

  componentDidMount() {
    console.log(this.state.data);
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
    // console.log(localStorage.getItem("role"));
    localStorage.removeItem("role");
    // console.log(localStorage.getItem("role"));
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
                <h1 class="h2">Đơn cần phê duyệt</h1>
              </div>
              <h5>Họ và tên: {this.state.data.user_name}</h5>
              <div id="main-monitor">
                <table className="table table-hover">
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
                    <div className="col-sm-6">
                      <h6>
                        Ghi chú từ sinh viên: {this.state.messageFromStudent}
                      </h6>
                      <p>Viết nhận xét</p>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                      />
                    </div>
                    <div className="col-sm-6">haha</div>
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
export default HomeLopTruong;
