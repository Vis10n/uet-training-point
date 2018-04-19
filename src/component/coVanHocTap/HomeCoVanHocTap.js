import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

//import css
import "./css/bootstrap.css";
import "./css/dashboard.css";
import "./css/HomeCoVanHocTap.css";

//import Components
import Login from "../Login";
import OpenForm from "./OpenForm";

class HomeCoVanHocTap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      role: this.props.role,

      data: [],
      quantityForm: 0
    }
    this.getFormList = this.getFormList.bind(this);
    this.showForm = this.showForm.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
    //TODO hiển thị DS form đã gửi lên
    console.log("get form list");
    this.getFormList();
  }

  //TODO lấy ds form ĐRL qua API
  getFormList() {
    axios
      .get("https://training-point.herokuapp.com/points", {
        headers: { token: this.state.token }
      })
      .then(response => {
        if (response.status === 200) {
          console.log("status 200");
          console.log(response);

          this.setState({
            quantityForm: response.data.points.length,
            data: response.data.points
          });
          console.log(this.state.data);
        }
        else {
          alert("Lỗi! Không thể tải dữ liệu");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //TODO render form ĐRL chi tiết
  showForm(data) {
    ReactDOM.render(
      <OpenForm
        token={this.state.token}
        role={this.state.role}
        data={data}
      />
      , document.getElementById("root"));
  }

  //TODO Dang xuat
  signOut() {
    localStorage.removeItem("role");
    ReactDOM.render(
      <Login />,
      document.getElementById("root")
    );
  }

  render() {


    return (
      <div>
        {/* navigation bar */}
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
            Teacher's Home
          </a>
          {/* <input className="form-control form-control-dark w-100" placeholder="Search" aria-label="Search" type="text"/> */}
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
                      Dashboard <span className="sr-only">(current)</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Main */}
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Danh sách phiếu ĐRL sinh viên</h1>
              </div>
              <div id="main-teacher">
                <div className="table-responsive">
                  <table id="example" className="table table-hover table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>ID </th>
                        <th>Tên </th>
                        <th>Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map(item => (
                        <tr key={item.id} onClick={() => this.showForm(item)}>
                          <td>{item.id}</td>
                          <td>{item.user_name}</td>
                          <td>{item.message}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>ID </th>
                        <th>Tên </th>
                        <th>Ghi chú</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="col-sm-2"></div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeCoVanHocTap;
