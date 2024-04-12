import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "../Pages/Admin/Admin";
import Client from "../Pages/Client/Client";
import Welcome from "../Pages/Welcome/Welcome";
import NewEvent from "../Pages/NewEvent/NewEvent";
import Login from "../Pages/Welcome/Login/Login";
import Register from "../Pages/Welcome/Register/Register";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome/login" />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/client" element={<Client />} />
      <Route path="/new-event" element={<NewEvent />} />
      <Route path="welcome" element={<Welcome />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default Routing;
