import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import "./Admin.css";

function Admin() {
    return (
        <div className="Admin">
            <HeaderAdmin />
            <div className="container">
                <div className="content">
                    <h1>ברוכים הבאים לממשק הניהול</h1>
                </div>
            </div>
        </div>
    );
}

export default Admin;
