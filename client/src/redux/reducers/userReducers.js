import { userActionTypes } from "../constants/userActionTypes";

export const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case userActionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case userActionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case userActionTypes.USER_LOGIN_FAILED:
      return { loading: false, error: payload };
    case userActionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userSignUpReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case userActionTypes.USER_SIGNUP_REQUEST:
      return { loading: true };
    case userActionTypes.USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: payload };
    case userActionTypes.USER_SIGNUP_FAILED:
      return { loading: false, error: true };
    default:
      return state;
  }
};

export const userHomeReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case userActionTypes.HOME_REQUEST:
      return { loading: true };
    case userActionTypes.HOME_SUCCESS:
      return { loading: false, homedata: payload };
    case userActionTypes.HOME_FAILED:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case userActionTypes.PROFILE_REQUEST:
      return { loading: true };
    case userActionTypes.PROFILE_SUCCESS:
      return { loading: false, profileData: payload };
    case userActionTypes.PROFILE_FAILED:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userProfileUpdateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case userActionTypes.PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case userActionTypes.PROFILE_UPDATE_SUCCESS:
      return { loading: false, profileData: payload };
    case userActionTypes.PROFILE_UPDATE_FAILED:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
