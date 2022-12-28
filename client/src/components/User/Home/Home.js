import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userHome, userlogout } from "../../../redux/actions/userActions";
import HomeImage from "./undraw_code_review_l1q9.svg";
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const home = useSelector((state) => state.userHome);
  const { loading, error, homedata } = home;

  useEffect(() => {
    let userinfo = localStorage.getItem("userInfo");
    // console.log(userinfo);
    if (userinfo != null) {
      dispatch(userHome());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const userLogout = () => {
    dispatch(userlogout());
    navigate("/login");
  };

  return (
    <div>
      {loading ? <h1>Loading....</h1> : ""}
      <main id="site-main">
        <div className="container">
          <div className="form-title text-center">
            <h2 className="text-dark">Customer Homepage</h2>
          </div>
          <div className="home-box d-flex">
            <div className="home-img-box">
              <img className="home-img" src={HomeImage} alt="homeImage" />
            </div>
            <div className="home-text-box">
              <Link to={"/profileEdit"}>
                <div className="editProfile">
                  <i className="fa-solid fa-pen"></i>
                </div>
              </Link>
              <div className="avatar-upload">
                <div className="avatar-edit"></div>
                <div className="avatar-preview">
                  <div
                    id="imagePreview"
                    style={{
                      backgroundImage: homedata
                        ? `url(${homedata.profile_picture})`
                        : "url(https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1608/tuktukdesign160800043/61010830-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg?ver=6)",
                    }}
                  ></div>
                </div>
              </div>
              <div className="home-text-welcome">
                Welcome {homedata ? homedata.name : ""}
              </div>
              <div className="home-text-name">
                Name : {homedata ? homedata.name : ""}
                <br />
                Gender : {homedata ? homedata.gender : ""}
                <br />
                Email : {homedata ? homedata.email : ""}
                <br />
              </div>
              <div className="logout-btn-form">
                <button className="logout-btn" onClick={userLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
