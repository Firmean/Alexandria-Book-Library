import "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styels from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errormsguser, setErrormsgUser] = useState<string>("");
  const [errormsgadmin, setErrormsgAdmin] = useState<string>("");
  const navigate = useNavigate();
  const handleSignup = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>, isAdmin:boolean) => {
    e.preventDefault();
    localStorage.setItem("type", isAdmin ? "admin" : "user");
    navigate("/signup");
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>, isAdmin:boolean) => {
    event.preventDefault();

    // if email and password are correct, navigate to newsfeed with correct user profile
    axios
      .get(`http://localhost:3000/${isAdmin?'admin':'user'}/${isAdmin?'admin':'user'}Login/${email}/${password}`)
      .then((response) => {
        localStorage.setItem("username", isAdmin ? response.data[0].admin_username : response.data[0].username);
        localStorage.setItem("email", response.data[0].email);

        isAdmin ? navigate("/adminHome") : navigate("/userHome");
      })
      .catch(() => {
        isAdmin ? setErrormsgAdmin("Invalid email or password") : setErrormsgUser("Invalid email or password");
      });
  };

  return (
    <div className={styels.outerwrapper}>
      <div className="row">
        <div className="col-3"></div>

        <div className="col-6">
          <div id="loginwrapper">
            <div id="loginheader">
              <h1>User Login</h1>
            </div>

            <div id="loginbody">
              <form onSubmit={e => handleLogin(e, false)}>
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
                <p className={styels.errMsg}>{errormsguser}</p>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>

              <p className="forgot-password text-right">
                Don't have an account? <a onClick={(e) => handleSignup(e, false)} className={styels.signup_link}>Sign up</a>
              </p>
            </div>
          </div>
        </div>

        <div className="col-3"></div>
      </div>
      <br /><br /><br />
      {/* Admin Login */}
      <div className="row">
        <div className="col-3"></div>

        <div className="col-6">
          <div id="loginwrapper">
            <div id="loginheader">
              <h1>Admin Login</h1>
            </div>

            <div id="loginbody">
              <form onSubmit={e => handleLogin(e, true)}>
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
                <p className={styels.errMsg}>{errormsgadmin}</p>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>

              <p className="forgot-password text-right">
                Don't have an account? <a onClick={(e) => handleSignup(e, true)} className={styels.signup_link}>Sign up</a>
              </p>
            </div>
          </div>
        </div>

        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default Login;
