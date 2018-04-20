import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

//import css
import "./css/bootstrap.css";
import "./css/dashboard.css";

//import Components
import Login from "../Login";
import HomeCoVanHocTap from "./HomeCoVanHocTap";

class OpenForm extends Component {
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
            point1M: this.props.data.point1_monitor,
            point2M: this.props.data.point2_monitor,
            point3M: this.props.data.point3_monitor,

            messageNew: null
        }
        this.sendToFaculty = this.sendToFaculty.bind(this);
        this.sendToMonitor = this.sendToMonitor.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }

    //TODO verify và gửi
    sendToFaculty() {
        axios
            .post(
                "https://training-point.herokuapp.com/verify",
                {
                    point_id: this.state.pointID,
                },
                {
                    headers: { token: this.state.token }
                }
            )
            .then(response => {
                if (response.data.status === "success") {
                    alert("Đã gửi cho văn phòng khoa");
                    this.backToDashboard();
                } else {
                    alert("Có lỗi xảy ra");
                }
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    checkComment() {
        if (this.state.messageNew === "" || this.state.messageNew === null) {
            return false;
        } else return true;
    }

    //TODO Reject về cho lớp trưởng
    sendToMonitor() {
        //kiểm tra comment
        if (!this.checkComment()) {
            alert("Lỗi! Chưa ghi lý do từ chối");
        }
        else {
            axios
                .post(
                    "https://training-point.herokuapp.com/reject",
                    {
                        point_id: this.state.pointID,
                        message: this.state.messageNew
                    },
                    {
                        headers: { token: this.state.token }
                    }
                )
                .then(response => {
                    if (response.data.status === "success") {
                        alert("Đã gửi cho lớp trưởng");
                        this.backToDashboard();
                    } else {
                        alert("Có lỗi xảy ra");
                    }
                    //console.log(response);
                });
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

    backToDashboard() {
        ReactDOM.render(
            <HomeCoVanHocTap
                token={this.state.token}
                role={this.state.role}
            />,
          document.getElementById("root")
        )
    }

    signOut() {
        localStorage.removeItem("role");
        ReactDOM.render(
            <Login />,
            document.getElementById("root"));
    }

    render() {
        //render
        return (
            <div>
                <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">
                        Teacher's Home
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
                            <h6>Ghi chú từ sinh viên: {this.state.messageFromStudent}</h6>
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
                                            <td>{this.state.point1}</td>
                                            <td>{this.state.point1M}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Điểm rèn luyện</td>
                                            <td>{this.state.point2}</td>
                                            <td>{this.state.point2M}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Điểm ngoại khóa</td>
                                            <td>{this.state.point3}</td>
                                            <td>{this.state.point3M}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h5>Viết nhận xét</h5>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleFormControlInput1"
                                                placeholder="Nhận xét"
                                                onChange={this.handleMessage}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <button
                                                type="button"
                                                class="btn btn-success"
                                                onClick={this.sendToFaculty}
                                            >
                                                Xác nhận
                                            </button>
                                            <br />
                                            <br />
                                            <button
                                                type="button"
                                                onClick={this.sendToMonitor}
                                                class="btn btn-danger"
                                            >
                                                Từ chối
                                            </button>
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
export default OpenForm;