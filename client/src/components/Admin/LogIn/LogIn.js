import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin } from "../../../redux/actions/adminActions";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = useSelector((state) => state.adminLogin);
  const { loading, error, adminInfo } = Login;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Handleform = (e) => {
    e.preventDefault();
    dispatch(adminLogin(email, password));
  };

  useEffect(() => {
    let admininfo = localStorage.getItem("adminInfo");
    if (admininfo) {
      navigate("/admin/home");
    }
  }, [adminInfo, navigate]);

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

  return (
    <div>
      {loading ? <h1>Loading....</h1> : ""}
      <main id="site-main">
        <div className="container">
          <div className="form-title text-center">
            <h2 className="text-dark">Admin Login</h2>
          </div>

          <form id="add_customers" onSubmit={Handleform}>
            <div className="new_user">
              {error ? invalidCredentials() : ""}
              <div className="form-group">
                <label className="text-light">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter admin email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-light">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter admin password"
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
      <div className="d-flex" style={{ marginLeft: "49%" }}>
        <Link to={"/"}>
          <div className="admin-login-link">User Login</div>
        </Link>
      </div>
    </div>
  );
}

export default LogIn;
