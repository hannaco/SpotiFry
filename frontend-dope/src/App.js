import { Route, Routes } from "react-router-dom";
import Login from "./LoginPage";
import HomePage from "./HomePage";
import Team from "./Team";
import Customize from "./Customize";
import React, { Component } from "react";
import Layout from "./Layout";

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
        <Layout>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Layout>
      </div>
    )
  };
}

export default App;
