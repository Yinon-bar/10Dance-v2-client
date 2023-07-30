import { Route, Routes } from "react-router-dom";
import Admin from "../Pages/Admin/Admin";
import Client from "../Pages/Client/Client";
import Welcome from "../Pages/Welcome/Welcome";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/client" element={<Client />} />
        </Routes>
    );
}

export default Routing;
