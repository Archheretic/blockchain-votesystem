import React, { Component } from "react";
import RegisterVoter from "./registerVoter";
import RegisterBallot from "./registerBallot";

import logo from "./logo.svg";
import "./App.css";

class MainPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Democrazy 2.0</h1>
        </header>
          <div>
              <RegisterBallot />
          </div>
      </div>
    );
  }
}

export default MainPage;
