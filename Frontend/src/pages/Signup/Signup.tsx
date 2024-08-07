import styles from "./Signup.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errormsg, setErrormsg] = useState<string>("");
  const navigate = useNavigate();
  const type = localStorage.getItem("type");

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if email and password are correct, navigate to login page
    axios
      .post(`http://localhost:3000/${type}/${type}Signup`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch(() => {
        console.log("Email already exists");
        setErrormsg("Email already exists");
      });
  };

  return (
    <div id={styles.outerwrapper}>
      <div className="row">
        <div className="col-3"></div>

        <div className="col-6">
          <div id="signupwrapper">
            <div id="signupheader">
              <h1>Sign Up</h1>
            </div>

            <div id="signupbody">
              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="username"
                    id="username"
                    className="form-control"
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <p style={{ color: "red" }}>{errormsg}</p>
                <button type="submit" className="btn btn-primary">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default Signup;
