import * as adminActionTypes from "../constants/adminActionTypes";
import axios from "axios";

const ActionType = adminActionTypes.adminActionTypes;

export const adminLogin = (email, password) => async (dispatch) => {
  // console.log(email, password);
  try {
    dispatch({ type: ActionType.ADMIN_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:3001/admin/login",
      { email, password },
      config
    );
    dispatch({ type: ActionType.ADMIN_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: ActionType.ADMIN_LOGIN_FAILED,
    });
  }
};

export const adminHome = () => async (dispatch) => {
  try {
    dispatch({ type: ActionType.HOME_REQUEST });

    const token = JSON.parse(localStorage.getItem("adminInfo"));
    // console.log(token.token);
    const config = {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    };

    const { data } = await axios.get(
      "http://localhost:3001/admin/home?id=" + token._id,
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

export const adminUserBlock = (id) => async (dispatch) => {
  // console.log(email, password);
  try {
   
    dispatch({ type: ActionType.ADMIN_USER_BLOCK_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://localhost:3001/admin/block-user?id="+id,
      config
    );
    dispatch({ type: ActionType.ADMIN_USER_BLOCK_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ActionType.ADMIN_USER_BLOCK_FAILED,
    });
  }
};


export const adminUserSearch = (name) => async (dispatch) => {
  // console.log(name);
  try {
    dispatch({ type: ActionType.ADMIN_USER_SEARCH_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:3001/admin/search",
      {name},
      config
    );
    dispatch({ type: ActionType.ADMIN_USER_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ActionType.ADMIN_USER_SEARCH_FAILED,
    });
  }
};

export const adminlogout = () => async (dispatch) => {
  localStorage.removeItem("adminInfo");
  dispatch({ type: ActionType.ADMIN_LOGOUT });
};
