import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../../redux/actions/userActions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = Login;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Handleform = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };

  useEffect(() => {
    let userinfo = localStorage.getItem("userInfo");
    if (userinfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const invalidCredentials = () => {
    return (
      <div className="form-group">
        <input
          type="text"
          name=""
          value="Invalid Credentials!!!"
          className="invalidCredentials"
          disabled
        />
      </div>
    );
  };

  const blockedUser = () => {
    return (
      <div className="form-group">
        <input
          type="text"
          name=""
          value="Your Account has been Blocked!!!"
          className="invalidCredentials"
          disabled
        />
      </div>
    );
  };

  return (
    <div>
      {loading ? <h1>Loading....</h1> : ""}
      <main id="site-main">
        <div className="container">
          <div className="form-title text-center">
            <h2 className="text-dark">Customer Login</h2>
          </div>

          <form id="add_customers" onSubmit={Handleform}>
            <div className="new_user">
              {error === "INCORRECT" ? invalidCredentials() : ""}
              {error === "BLOCKED" ? blockedUser() : ""}
              {/* <div className="form-group">
                    <input type="text" name="" value="Invalid Credentials!!!" className="<%= invalidCredentials === true ? 'invalidCredentials' : 'invalidCredentials_disable' %>" disabled>
                    <input type="text" name="" value="Account Created Successfully" className="<%= accountCreated === true ? 'account_created_success' : 'account_created_disable' %>" disabled>
                </div> */}
              <div className="form-group">
                <label className="text-light">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter customer email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-light">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter customer password"
                  autoComplete="on"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button className="btn text-dark update">Login</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <div className="signup-link">
        <div className="d-flex ">
          Don't have an account?
          <Link to={"/signup"} className="ml-2">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="d-flex" style={{ marginLeft: "49%" }}>
        <Link to={"/admin/login"}>
          <div className="admin-login-link">Admin Login</div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
