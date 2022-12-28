import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  adminHome,
  adminlogout,
  adminUserBlock,
  adminUserSearch,
} from "../../../redux/actions/adminActions";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchUser, setSearchUser] = useState("");

  // console.log(searchUser);

  const home = useSelector((state) => state.adminHome);
  const search = useSelector((state) => state.adminUserSearch);

  let { searchloading, searcherror, searchData } = search;

  // console.log(searchData);

  const errorMessageBlocked = useRef();
  const errorMessageUnblocked = useRef();

  let { loading, error, homeData } = home;
  const deleteInfo = useSelector((state) => state.adminUserDelete);
  const { deleteloading, deleteerror, deletedata } = deleteInfo;

  // console.log(homeData);

  useEffect(() => {
    let admininfo = localStorage.getItem("adminInfo");
    // console.log(admininfo);
    if (admininfo != null) {
      dispatch(adminHome());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, deleteInfo]);

  const adminLogout = () => {
    dispatch(adminlogout());
    navigate("/admin/login");
  };
  const blockUser = (id, status) => {
    // console.log(status);
    dispatch(adminUserBlock(id));
    if (status) {
      errorMessageUnblocked.current.style.display = "block";
      errorMessageBlocked.current.style.display = "none";
      setTimeout(() => {
        errorMessageUnblocked.current.style.display = "none";
      }, 2000);
    } else {
      errorMessageBlocked.current.style.display = "block";
      errorMessageUnblocked.current.style.display = "none";
      setTimeout(() => {
        errorMessageBlocked.current.style.display = "none";
      }, 2000);
    }
  };

  const searchUserList = () => {
    // console.log(data);
    dispatch(adminUserSearch(searchUser));
  };
  // if (searchData) {
  //   homeData.CustomerData = searchData;
  // }

  return (
    <div>
      <header id="header">
        <nav>
          <div className="container">
            <div className="text-center">
              <Link to={"/admin/home"} className="nav-brand text-white">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main id="site-main">
        <div className="container">
          <div className="box-nav d-flex justify-between">
            {/* <Link href="/admin/add-customer" className="border-shadow">
              <span className="text-gradient">
                New User <i className="fas fa-user"></i>
              </span>
            </Link> */}
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "contents" }}
            >
              <div className="search-box">
                <input
                  className="search-box-input"
                  type="text"
                  name="name"
                  value={searchUser}
                  placeholder="search by username"
                  onChange={(e) => {
                    setSearchUser(e.target.value);
                  }}
                />
                <button className="search-btn" onClick={searchUserList}>
                  <i className="fa-solid fa-magnifying-glass search-box-icon"></i>
                </button>
              </div>
            </form>
            <button className="btn-logout border-shadow" onClick={adminLogout}>
              <span className="text-gradient">
                Logout <i className="fas fa-user"></i>
              </span>
            </button>
          </div>
          <div className="user-delete-indicator" ref={errorMessageBlocked}>
            <div className="user-delete-indicator-text">
              Customer Blocked Successfully
            </div>
          </div>
          <div className="user-unblock-indicator" ref={errorMessageUnblocked}>
            <div className="user-delete-indicator-text">
              Customer Unblocked Successfully
            </div>
          </div>
          <table className="table" style={{ marginTop: "2em" }}>
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>@Email</th>
                <th>Gender</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {!searchData
                ? homeData
                  ? homeData.CustomerData.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.gender}</td>
                          <td>
                            <button
                              className="btn border-shadow update"
                              onClick={() => {
                                blockUser(data._id, data.blocked_status);
                              }}
                            >
                              <span className="text-gradient">
                                {data.blocked_status === true
                                  ? "Unblock"
                                  : "Block"}
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : ""
                : searchData.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.gender}</td>
                        <td>
                          <button
                            className="btn border-shadow update"
                            onClick={() => {
                              blockUser(data._id, data.blocked_status);
                            }}
                          >
                            <span className="text-gradient">
                              {data.blocked_status === true
                                ? "Unblock"
                                : "Block"}
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Home;
