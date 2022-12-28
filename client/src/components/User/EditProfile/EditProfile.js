import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userProfile,
  userProfileUpdate,
} from "../../../redux/actions/userActions";
import { userActionTypes } from "../../../redux/constants/userActionTypes";

function EditProfile() {
  const profile = useSelector((state) => state.userProfile);
  const { loading, error, profileData } = profile;
  console.log(profileData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const imagePreview = useRef();

  useEffect(() => {
    let userinfo = localStorage.getItem("userInfo");
    if (userinfo != null) {
      dispatch(userProfile());
    } else {
      navigate("/login");
    }
    if (profilePic) {
      const objectUrl = URL.createObjectURL(profilePic);
      imagePreview.current.style.backgroundImage = `url(${objectUrl})`;
    }
  }, [profilePic]);

  const Handleform = (e) => {
    // console.log('form submitted');
    e.preventDefault();
    dispatch({ type: userActionTypes.PROFILE_UPDATE_REQUEST });
    if (profilePic !== "") {
      // console.log(profilePic);
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
          //   console.log(data);
          const profileURL = data.url;
          dispatch(
            userProfileUpdate(name, email, gender, password, profileURL)
          );
          navigate("/");
        });
    } else {
      const profileURL = "";
      dispatch(userProfileUpdate(name, email, gender, password, profileURL));
      navigate("/");
    }
  };

  return (
    <div>
      <main id="site-main" style={{ marginTop: "0px" }}>
        {loading ? <h1>Loading...</h1> : ""}
        <div className="container">
          <div className="form-title text-center">
            <h2 className="text-dark">Update Profile</h2>
            <span className="text-light">
              Use the below form to update your account
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
                    onChange={(e) => {
                      setProfilePic(e.target.files[0]);
                    }}
                  />
                  <label htmlFor="imageUpload"></label>
                </div>
                <div className="avatar-preview">
                  <div
                    id="imagePreview"
                    style={{
                      backgroundImage: "",
                    }}
                    ref={imagePreview}
                  ></div>
                </div>
              </div>
              {/* {error ? userExists() : ""} */}
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
                <button type="submit" className="btn text-dark update">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProfile;
