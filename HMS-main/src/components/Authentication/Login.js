import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Styles/Login.module.css";

const Login = ({ type = "patient" }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory(); // Used for navigation

    // Function to get the correct header based on the user type
    const getHeader = () => {
        switch (type) {
            case "doctor":
                return "Doctor Login";
            case "admin":
                return "Admin Login";
            default:
                return "Patient Login";
        }
    };

    // Function to handle login submission
    const handleLogin = (e) => {
        e.preventDefault();

        // Hardcoded credentials
        const validUsername = "Test";
        const validPassword = "Test@123";

        // Check if the entered credentials match the hardcoded credentials
        if (username === validUsername && password === validPassword) {
            // Redirect based on the user type
            if (type === "patient") {
                history.push("/patient/dashboard");
            } else if (type === "doctor") {
                history.push("/doctors/dashboard");
            } else if (type === "admin") {
                history.push("/admin/dashboard");
            }
        } else {
            // Show error message if credentials are incorrect
            setErrorMessage("Invalid username or password");
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginContainer}>
                <header className={styles.header}>{getHeader()}</header>

                <form onSubmit={handleLogin}>
                    <div className={styles.inputBox}>
                        <input
                            type="text"
                            className={styles.inputField}
                            placeholder="Username or Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <i className="bx bx-user"></i>
                    </div>

                    <div className={styles.inputBox}>
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i className="bx bx-lock-alt"></i>
                    </div>

                    {/* Error message display */}
                    {errorMessage && (
                        <p className={styles.error}>{errorMessage}</p>
                    )}

                    <div className={styles.inputBox}>
                        <input
                            type="submit"
                            className={styles.submit}
                            value="Sign In"
                        />
                    </div>

                    <div className={styles.twoCol}>
                        <div className={styles.one}>
                            <input type="checkbox" id="login-check" />
                            <label htmlFor="login-check"> Remember Me</label>
                        </div>
                        <div className={styles.two}>
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
