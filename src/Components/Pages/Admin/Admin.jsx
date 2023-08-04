import axios from "axios";
import "./Admin.css";
import { useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";

function Admin() {
    const [attendee, setAttendee] = useState([]);
    const [tables, setTables] = useState([]);

    const handleEvent = (e) => {
        console.log(e.target.value);
        axios
            .get("http://localhost:3001/api/" + e.target.value, {
                headers: { "Content-Type": "application/json" },
            })
            .then((resp) => {
                console.log(resp.data);
                setAttendee(resp.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        // להוסיף לפה קריאה של כל הטבלאות שיש בדאטהבייס
        axios
            .get("http://localhost:3001/api/tables", {
                headers: { "Content-Type": "application/json" },
            })
            .then((resp) => {
                console.log(resp.data);
                setTables(resp.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="Admin">
            <HeaderAdmin />
            <div className="container">
                <div className="content">
                    <h1>ברוכים הבאים לממשק הניהול</h1>
                    <h3>בחר אירוע להצגה</h3>
                    <select
                        onChange={(e) => handleEvent(e)}
                        name="בחר אירוע להצגה"
                        id=""
                    >
                        <option defaultChecked hidden value="">
                            ללא
                        </option>
                        <option value="dec_geo">יום עיון</option>
                        <option value="attendees">כנס גיאוגרפיה</option>
                    </select>
                    <AttTable attendee={attendee} />
                </div>
            </div>
        </div>
    );
}

export default Admin;
