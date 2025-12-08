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
  const [currentTable, setCurrentTable] = useState();
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);

  const handleEvent = (e) => {
    console.log(e);
    axios
      .get(
        // Local
        "http://localhost/10Dance-V2-php-server/4-controllers/get-all-attendees.php?tableName=" +
          e
      )
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("Current Table", e);
        setAttendee(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost/10Dance-V2-php-server/4-controllers/read.php")
      .then((resp) => {
        // console.log(resp);
        setTables(resp.data);
      })
      .catch((err) => console.log(err));
    if (
      localStorage.getItem("Current Table") !== null &&
      localStorage.getItem("Current Table").length > 0
    ) {
      console.log("Not null");
      setCurrentTable(localStorage.getItem("Current Table"));
      handleEvent(localStorage.getItem("Current Table"));
      console.log(currentTable);
    }
  }, []);

  return (
    <div className="Admin">
      <HeaderAdmin />
      <div className="container">
        <div className="content">
          <h1>ברוכים הבאים לממשק הניהול</h1>
          <h3>בחר אירוע להצגה</h3>
          <select
            onChange={(e) => handleEvent(e.target.value)}
            name="בחר אירוע להצגה"
          >
            <option defaultChecked hidden value="">
              ללא
            </option>
            {tables.map((table, index) => (
              <option
                selected={table.event_table === currentTable}
                key={index}
                value={table.event_table}
              >
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
