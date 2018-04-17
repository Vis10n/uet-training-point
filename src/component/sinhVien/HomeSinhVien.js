import React, { Component } from "react";

class HomeSinhVien extends Component {
  constructor(props) {
    super(props);
    this.state = {
        token : this.props.token,
        role : this.props.role
    };

  }

  render() {
    return <div>
        
        <p>{this.state.token}</p>
        <p>{this.state.role}</p>
        </div>;
  }
}
export default HomeSinhVien;
