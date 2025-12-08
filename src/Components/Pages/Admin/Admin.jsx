import axios from "axios";
import "./Admin.css";
import { useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import AddModal from "./AddModal/AddModal";
import { useContext } from "react";
import CurrentEvent from "../../../Context/CurrentEventContext";
import AuthContext from "../../../Context/AuthContext";

function Admin() {
  const [attendee, setAttendee] = useState([]);
  const [tables, setTables] = useState([]);
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);
  const { userFromDb, setUserFromDb } = useContext(AuthContext);

  const handleEvent = (e) => {
    console.log(e.target.value);
    axios
      .get(
        // Local
        "http://localhost/10Dance-V2-php-server/4-controllers/get-all-attendees.php?tableName=" +
          e.target.value
      )
      .then((resp) => {
        // console.log(resp.data);
        setAttendee(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // console.log(tables);
    axios
      .get("http://localhost/10Dance-V2-php-server/4-controllers/read.php")
      .then((resp) => {
        // console.log(resp);
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
              <option key={index} value={table.event_table}>
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
