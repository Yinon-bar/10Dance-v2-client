import axios from "axios";
import "./Admin.css";
import { useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";

function Admin() {
    const [attendee, setAttendee] = useState([]);
    const [tables, setTables] = useState([]);

    const handleEvent = (e) => {
        // console.log(e.target.value);
        axios
            .get(
                // Local
                // "http://localhost:3001/api/" +
                // Render hosting
                "https://one0dance-v2-nodejs-mysql.onrender.com/api/" +
                    e.target.value
            )
            .then((resp) => {
                // console.log(resp.data);
                setAttendee(resp.data);
            })
            .catch((err) => console.log(err));
    };

    const handleSearch = (term) => {
        console.log(term);
    };

    useEffect(() => {
        // להוסיף לפה קריאה של כל הטבלאות שיש בדאטהבייס
        axios
            .get(
                // Local
                // "http://localhost:3001/api/tables",
                "https://one0dance-v2-nodejs-mysql.onrender.com/api/tables",
                // סתאם לנסיון
                // "https://jsonplaceholder.typicode.com/todos",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods":
                            "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    },
                }
            )
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
                    <div className="commandRibbon">
                        <div className="rightSide">
                            <h3>בחר אירוע להצגה</h3>
                            <select
                                onChange={(e) => handleEvent(e)}
                                name="בחר אירוע להצגה"
                                id=""
                            >
                                <option defaultChecked hidden value="">
                                    ללא
                                </option>
                                {tables.map((table, index) => (
                                    <option
                                        key={index}
                                        value={table.Tables_in_zerdance_general}
                                    >
                                        {table.Tables_in_zerdance_general}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="leftSide">
                            <input
                                className="searchAtt"
                                type="text"
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="חיפוש אנשים"
                            />
                            <button className="btn btn-primary">+</button>
                        </div>
                    </div>
                    <AttTable attendee={attendee} />
                </div>
            </div>
        </div>
    );
}

export default Admin;
