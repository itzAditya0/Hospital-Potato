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
                {/* Route for Login Options */}
                <Route exact path="/" component={LoginOptions} />

                {/* Routes for Login */}
                <Route
                    path="/login/patient"
                    render={() => <Login type="patient" />}
                />
                <Route
                    path="/login/doctor"
                    render={() => <Login type="doctor" />}
                />
                <Route
                    path="/login/admin"
                    render={() => <Login type="admin" />}
                />

                {/* Routes for Register */}
                <Route
                    path="/register/patient"
                    render={() => <Register type="patient" />}
                />

                {/* Route for Admin Dashboard */}
                <Route path="/admin">
                    <AdminDashboard />
                </Route>

                {/* Route for Doctor Dashboard */}
                <Route path="/doctors">
                    <DoctorDashboard />
                </Route>

                {/* Route for Patient Dashboard */}
                <Route path="/patient">
                    <PatientDashboard />
                </Route>

                {/* Redirect to home if route is not found */}
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;
