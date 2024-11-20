// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import LoginOptions from "./components/Authentication/LoginOptions";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import DoctorDashboard from "./components/Dashboard/DoctorsDashboard";
import PatientDashboard from "./components/Dashboard/PatientDashboard";

function App() {
  return (
    <Router>
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={LoginOptions} />
        <Route path="/login/patient" render={() => <Login type="patient" />} />
        <Route path="/login/doctor" render={() => <Login type="doctor" />} />
        <Route path="/login/admin" render={() => <Login type="admin" />} />
        <Route
          path="/register/patient"
          render={() => <Register type="patient" />}
        />

        {/* Dashboard Routes (Now Unprotected) */}
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/doctors/dashboard" component={DoctorDashboard} />
        <Route path="/patient/dashboard" component={PatientDashboard} />

        {/* Redirect to home if route is not found */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
