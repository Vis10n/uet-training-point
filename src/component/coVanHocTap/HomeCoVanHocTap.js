import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "../Login";
import axios from "axios";

// css
import "./css/bootstrap.css";
import "./css/HomeCoVanHocTap.css";

class HomeCoVanHocTap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      role: this.props.role,

      data: [],
      quantityForm: 0
    };
    this.getFormList = this.getFormList.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
    //show ds form da gui len
    console.log("get form list");
    this.getFormList();
  }
  
  getFormList () {
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
          alert("Error! Failed to load data");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  signOut() {
    // console.log(localStorage.getItem("role"));
    localStorage.removeItem("role");
    // console.log(localStorage.getItem("role"));
    ReactDOM.render(
      <Login />,
       document.getElementById("root")
    );
  }

  render() {


    return (
      <div>
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
            Teacher
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
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Reports
                    </a>
                  </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Saved reports</span>
                  <a className="d-flex align-items-center text-muted" href="">
                  </a>
                </h6>
                <ul className="nav flex-column mb-2">
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Current month
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Last quarter
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Danh sách đơn</h1>
              </div>
              <div id="main-teacher">
                <div className="table-responsive">
                  <table className="table table-stripped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map(item => (
                        <tr key={item.id} onClick={() => this.openDocument(item)}>
                          <td>{item.id}</td>
                          <td>{item.user_name}</td>
                          <td>{item.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeCoVanHocTap;
