import { Route, Routes } from "react-router-dom";
import Login from "./LoginPage";
import HomePage from "./HomePage";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <div>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
          </Routes>
      </div>
    )
  };
}

export default App;
