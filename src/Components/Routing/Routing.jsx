import { Route, Routes } from "react-router-dom";
import Admin from "../Pages/Admin/Admin";
import Client from "../Pages/Client/Client";
import Welcome from "../Pages/Welcome/Welcome";
import NewEvent from "../Pages/NewEvent/NewEvent";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/client" element={<Client />} />
            <Route path="/new-event" element={<NewEvent />} />
        </Routes>
    );
}

export default Routing;
