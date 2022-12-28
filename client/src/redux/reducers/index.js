import { combineReducers } from "redux";
import * as UserReducers from "./userReducers";
import * as AdminReducers from "./adminReducers";

const reducer = combineReducers({
  userLogin: UserReducers.userLoginReducer,
  userSignUp: UserReducers.userSignUpReducer,
  userHome: UserReducers.userHomeReducer,
  userProfile: UserReducers.userProfileReducer,
  userProfileUpdate: UserReducers.userProfileUpdateReducer,

  adminLogin: AdminReducers.adminLoginReducer,
  adminHome: AdminReducers.adminHomeReducer,
  adminUserDelete: AdminReducers.adminUserDeleteReducer,
  adminUserSearch: AdminReducers.adminUserSearchReducer,
});

export default reducer;
