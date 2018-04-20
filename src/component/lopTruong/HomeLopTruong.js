import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import OpenDocument from "./OpenDocument";
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
      data: [],
      numberOfDocument: 0
    };
    this.openDocument = this.openDocument.bind(this);
  }

  openDocument(data) {
    ReactDOM.render(
      <OpenDocument
        token={this.state.token}
        role={this.state.role}
        data={data}
      />,
      document.getElementById("root")
    );
  }

  getApi() {
    axios
      .get("https://training-point.herokuapp.com/points", {
        headers: { token: this.state.token }
      })
      .then(response => {
        console.log(response.status);
        if (response.status === 200) {
          console.log("status 200");
          console.log(response);

          this.setState({
            numberOfDocument: response.data.points.length,
            data: response.data.points
          });
          console.log(this.state.data);
        } else {
          alert("Fail to load data");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidMount() {
    console.log(this.state.token);
    console.log("getapi");
    this.getApi();
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
                      Thông báo
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">Danh sách các đơn đang chờ phê duyệt</h1>
              </div>
              <div id="main-monitor">
                
                <p>Có tổng cộng: {this.state.numberOfDocument} đơn</p> <br />
                <br />
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID của đơn</th>
                      <th scope="col">Họ tên</th>
                      <th scope="col">Ghi chú</th>
                      <th scope="col">Ngày gửi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map(item => (
                      <tr key={item.id} onClick={() => this.openDocument(item)}>
                        <td>{item.id}</td>
                        <td>{item.user_name}</td>
                        <td>{item.message}</td>
                        <td>{item.updated_at.slice(0, 10)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeLopTruong;
