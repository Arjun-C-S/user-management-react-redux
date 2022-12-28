import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../../redux/actions/userActions";
import { userActionTypes } from "../../../redux/constants/userActionTypes";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const imagePreview = useRef();

  const Signup = useSelector((state) => state.userSignUp);
  const { loading, error, userInfo } = Signup;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Handleform = (e) => {
    e.preventDefault();
    dispatch({ type: userActionTypes.USER_SIGNUP_REQUEST }); //to show loading... in time of image upload and get response back
    if (profilePic !== "") {
      const data = new FormData();
      // console.log(profilePic);
      data.append("file", profilePic);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dzfyfd5bg"); //cloud name can get from cloudinary
      fetch("https://api.cloudinary.com/v1_1/dzfyfd5bg/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          const profileURL = data.url;
          dispatch(userSignup(name, email, gender, password, profileURL));
          setName("");
          setEmail("");
          setGender("");
          setPassword("");
          setProfilePic("");
          imagePreview.current.style.backgroundImage =
            "url(https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1608/tuktukdesign160800043/61010830-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg?ver=6)";
        });
    } else {
      const profileURL =
        "https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1608/tuktukdesign160800043/61010830-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg?ver=6";
      dispatch(userSignup(name, email, gender, password, profileURL));
      setName("");
      setEmail("");
      setGender("");
      setPassword("");
      setProfilePic("");
      imagePreview.current.style.backgroundImage =
        "url(https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1608/tuktukdesign160800043/61010830-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg?ver=6)";
    }
  };

  useEffect(() => {
    let userinfo = localStorage.getItem("userInfo");
    if (userinfo) {
      navigate("/");
    }
    if (profilePic) {
      const objectUrl = URL.createObjectURL(profilePic);
      // console.log(objectUrl);
      imagePreview.current.style.backgroundImage = `url(${objectUrl})`;
    }
  }, [userInfo, navigate, profilePic]);

  const userExists = () => {
    return (
      <div className="form-group">
        <input
          type="text"
          name=""
          value="Email already exists"
          className="emailExists"
          disabled
        />
      </div>
    );
  };

  return (
    <div>
      {loading ? <h1>Loading....</h1> : ""}
      <main id="site-main" style={{ marginTop: "0px" }}>
        <div className="container">
          <div className="form-title text-center">
            <h2 className="text-dark">New Customer</h2>
            <span className="text-light">
              Use the below form to create a new account
            </span>
          </div>

          <form id="add_customers" onSubmit={Handleform}>
            <div className="new_user">
              <div className="avatar-upload">
                <div className="avatar-edit">
                  <input
                    type="file"
                    id="imageUpload"
                    name="profile_picture"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                  />
                  <label htmlFor="imageUpload"></label>
                </div>
                <div className="avatar-preview">
                  <div
                    id="imagePreview"
                    style={{
                      backgroundImage:
                        "url(https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1608/tuktukdesign160800043/61010830-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg?ver=6)",
                    }}
                    ref={imagePreview}
                  ></div>
                </div>
              </div>
              {error ? userExists() : ""}
              <div className="form-group">
                <label className="text-light">Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter customer name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="text-light">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter customer email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="text-light">Gender</label>
                <div className="radio inline">
                  <input
                    type="radio"
                    id="radio-2"
                    name="gender"
                    value="Male"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label htmlFor="radio-2" className="radio-label">
                    Male
                  </label>
                </div>
                <div className="radio inline">
                  <input
                    type="radio"
                    id="radio-3"
                    name="gender"
                    value="Female"
                    onClick={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label htmlFor="radio-3" className="radio-label">
                    Female
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="text-light">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  autoComplete="on"
                  placeholder="Enter customer password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <button className="btn text-dark update">SignUp</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <div className="signup-link">
        <div className="d-flex ">
          Already have an account?{" "}
          <Link to={"/login"} className="ml-2">
            {" "}
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
