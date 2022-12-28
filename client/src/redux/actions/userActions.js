import * as userActionTypes from "../constants/userActionTypes";
import axios from "axios";

const ActionType = userActionTypes.userActionTypes;

export const userLogin = (email, password) => async (dispatch) => {
  // console.log(email, password);
  try {
    dispatch({ type: ActionType.USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:3001/customer/login",
      { email, password },
      config
    );
    dispatch({ type: ActionType.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: ActionType.USER_LOGIN_FAILED,
      payload: error.response.data
    });
  }
};

export const userSignup =
  (name, email, gender, password, profilePic) => async (dispatch) => {
    // console.log(name, email, gender, password, profilePic);
    try {
      dispatch({ type: ActionType.USER_SIGNUP_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/customer/signup",
        { name, email, gender, password, profilePic },
        config
      );
      console.log("success");
      dispatch({ type: ActionType.USER_SIGNUP_SUCCESS, payload: data });
    } catch (error) {
      console.log("error");
      dispatch({
        type: ActionType.USER_SIGNUP_FAILED,
      });
    }
  };

export const userHome = () => async (dispatch) => {
  try {
    dispatch({ type: ActionType.HOME_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(token.token);
    const config = {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    };

    const { data } = await axios.get(
      "http://localhost:3001/customer/home?id=" + token._id,
      config
    );
    dispatch({ type: ActionType.HOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionType.HOME_FAILED,
    });
    // console.log(error.response.data);
  }
};

export const userProfile = () => async (dispatch) => {
  try {
    dispatch({ type: ActionType.PROFILE_REQUEST });

    const token = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(token.token);
    const config = {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    };

    const { data } = await axios.get(
      "http://localhost:3001/customer/profile?id=" + token._id,
      config
    );
    dispatch({ type: ActionType.PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionType.PROFILE_FAILED,
    });
  }
};

export const userProfileUpdate =
  (name, email, gender, password, profilePic) => async (dispatch) => {
    // console.log(profilePic);
    const token = JSON.parse(localStorage.getItem("userInfo"));
    const userId = token._id;
    try {
      dispatch({ type: ActionType.PROFILE_UPDATE_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/customer/profile",
        { name, email, gender, password, profilePic, userId },
        config
      );
      console.log("success");
      dispatch({ type: ActionType.PROFILE_UPDATE_SUCCESS, payload: data });
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(JSON.parse(localStorage.getItem("userInfo")));
    } catch (error) {
      console.log("error");
      dispatch({
        type: ActionType.PROFILE_UPDATE_FAILED,
      });
    }
  };

  

export const userlogout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: ActionType.USER_LOGOUT });
};
