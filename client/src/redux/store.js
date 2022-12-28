import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

const middleware = [thunk];

let userinfo = JSON.parse(localStorage.getItem("userInfo"));

const initialstate = {
  userLogin: { userinfo: userinfo },
};


const store = createStore(
  reducers,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
