import axios from "axios";
import "./Admin.css";
import { useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import AddModal from "./AddModal/AddModal";
import { useContext } from "react";
import CurrentTableContext from "../../../Context/CurrentTableContext";

function Admin() {
  const [attendee, setAttendee] = useState([]);
  const [tables, setTables] = useState([]);

  const handleEvent = (e) => {
    // console.log(e.target.value);
    axios
      .get(
        // Local
        "http://localhost:3001/api/" +
          // Render hosting
          // "https://one0dance-v2-nodejs-mysql.onrender.com/api/" +
          e.target.value,
        {
          // headers: {
          //     "Content-Type": "application/json",
          //     "Access-Control-Allow-Origin": "*",
          //     "Access-Control-Allow-Methods":
          //         "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          // },
        }
      )
      .then((resp) => {
        // console.log(resp.data);
        setAttendee(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // להוסיף לפה קריאה של כל הטבלאות שיש בדאטהבייס
    axios
      .get(
        // Local
        // "http://localhost:3001/api/tables",

        // זה הנכון
        // "https://one0dance-v2-nodejs-mysql.onrender.com/api/tables",

        "http://localhost/10Dance-V2-php-server/API/attendees/read.php",

        // סתאם לנסיון
        // "https://jsonplaceholder.typicode.com/todos",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
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
          <h3>בחר אירוע להצגה</h3>
          <select onChange={(e) => handleEvent(e)} name="בחר אירוע להצגה" id="">
            <option defaultChecked hidden value="">
              ללא
            </option>
            {tables.map((table, index) => (
              <option key={index} value={table.Tables_in_zerdance_general}>
                {table.event_name}
              </option>
            ))}
          </select>
          <AttTable attendee={attendee} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
