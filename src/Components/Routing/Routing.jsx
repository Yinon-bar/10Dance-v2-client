import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "../Pages/Admin/Admin";
import Client from "../Pages/Client/Client";
import Welcome from "../Pages/Welcome/Welcome";
import NewEvent from "../Pages/NewEvent/NewEvent";
import Login from "../Pages/Welcome/Login/Login";
import Register from "../Pages/Welcome/Register/Register";
import About from "../Pages/About/About";
import SelectEvent from "../Pages/SelectEvent/SelectEvent";
import ForgotPassword from "../Pages/Welcome/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/Welcome/ResetPassword/ResetPassword";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome/login" />} />
      <Route path="/select-event" element={<SelectEvent />} />
      <Route path="/admin/:id" element={<Admin />} />
      <Route path="/client" element={<Client />} />
      <Route path="/new-event" element={<NewEvent />} />
      <Route path="/about" element={<About />} />
      <Route path="welcome" element={<Welcome />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="*" element={<h1>דף לא נמצא</h1>} />
    </Routes>
  );
}

export default Routing;
