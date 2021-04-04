import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./modules/Login/Login.component";
import HomePage from "./modules/Home/Home.compnent";
import ProfilePage from "./modules/Profile/Profile.component";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
          <Route path="/" exact component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />

          </Switch>
        </div>
      </Router> 
    </div>
  );
}

export default App;
