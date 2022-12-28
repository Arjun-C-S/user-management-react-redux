import { adminActionTypes } from "../constants/adminActionTypes";

export const adminLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case adminActionTypes.ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case adminActionTypes.ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: payload };
    case adminActionTypes.ADMIN_LOGIN_FAILED:
      return { loading: false, error: true };
    case adminActionTypes.ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const adminHomeReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case adminActionTypes.HOME_REQUEST:
      return { loading: true };
    case adminActionTypes.HOME_SUCCESS:
      return { loading: false, homeData: payload };
    case adminActionTypes.HOME_FAILED:
      return { loading: false, error: true };
    default:
      return state;
  }
};

export const adminUserDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case adminActionTypes.ADMIN_USER_BLOCK_REQUEST:
      return { deleteloading: true };
    case adminActionTypes.ADMIN_USER_BLOCK_SUCCESS:
      return { deleteloading: false, deleteData: payload };
    case adminActionTypes.ADMIN_USER_BLOCK_FAILED:
      return { deleteloading: false, deleteerror: true };
    default:
      return state;
  }
};

export const adminUserSearchReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case adminActionTypes.ADMIN_USER_SEARCH_REQUEST:
      return { searchloading: true };
    case adminActionTypes.ADMIN_USER_SEARCH_SUCCESS:
      return { searchloading: false, searchData: payload };
    case adminActionTypes.ADMIN_USER_SEARCH_FAILED:
      return { searchloading: false, searcherror: true };
    default:
      return state;
  }
};
