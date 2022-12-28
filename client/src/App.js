import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login/Login";
import SignUp from "./components/User/SignUp/SignUp";
import Home from "./components/User/Home/Home";
import EditProfile from "./components/User/EditProfile/EditProfile";
import AdminLogIn from "./components/Admin/LogIn/LogIn";
import AdminHome from "./components/Admin/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profileEdit" element={<EditProfile />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/admin/login" exact element={<AdminLogIn />} />
        <Route path="/admin/home" exact element={<AdminHome />} />
      </Routes>
    </div>
  );
}

export default App;
