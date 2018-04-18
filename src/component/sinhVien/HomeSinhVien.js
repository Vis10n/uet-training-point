import React, { Component } from "react";
import "./HomeSinhVien.css";
import ReactDOM from "react-dom";
import Login from "../Login";

class HomeSinhVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      role: this.props.role
    };
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    //check da lam don chua tai day
    
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
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
            Company name
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" onClick={this.signOut}>
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
                    <a className="nav-link" href="#">
                      Products
                    </a>
                  </li>{" "}
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Products
                    </a>
                  </li>{" "}
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Products
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <main
              role="main"
              className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
            >
              <h2>Section title</h2>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
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
export default HomeSinhVien;
