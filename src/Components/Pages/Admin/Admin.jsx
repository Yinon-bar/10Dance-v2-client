import axios from "axios";
import "./Admin.css";
import { useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import AddModal from "./AddModal/AddModal";
import { useContext } from "react";
import CurrentEvent from "../../../Context/CurrentEventContext";
import AuthContext from "../../../Context/AuthContext";
import { IoPersonAdd } from "react-icons/io5";

function Admin() {
  const [attendee, setAttendee] = useState([]);
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState();
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);
  const [addAttendee, setAddAttendee] = useState(false);

  const handleEvent = (e) => {
    // console.log(e);
    axios
      .get(
        // Local
        "http://localhost/10Dance-V2-php-server/4-controllers/get-all-attendees.php?tableName=" +
          e
      )
      .then((resp) => {
        localStorage.setItem("Current Table", e);
        setAttendee(resp.data);
        setCurrentTable(e);
        getCurrentEvent();
      })
      .catch((err) => console.log(err));
  };

  const getCurrentEvent = () => {
    console.log(currentTable);

    const currentEventTemp = tables.find(
      (tempTable) => tempTable.event_table === currentTable
    );
    setCurrentEvent(currentEventTemp);
  };

  useEffect(() => {
    axios
      .get("http://localhost/10Dance-V2-php-server/4-controllers/read.php")
      .then((resp) => {
        // console.log(resp.data);
        setTables(resp.data);
        // console.log(currentTable);
        if (
          localStorage.getItem("Current Table") !== null &&
          localStorage.getItem("Current Table").length > 0
        ) {
          console.log("Not null");
          setCurrentTable(localStorage.getItem("Current Table"));
          handleEvent(localStorage.getItem("Current Table"));
          getCurrentEvent();
        }
      })
      .catch((err) => console.log(err));
  }, [currentTable]);

  return (
    <div className="Admin">
      <HeaderAdmin />
      <div className="container">
        <div className="content">
          <h1>ברוכים הבאים לממשק הניהול</h1>
          <h3>בחר אירוע להצגה</h3>
          <div className="buttons">
            <button
              onClick={() => {
                setAddAttendee(true);
              }}
            >
              <IoPersonAdd size={30} />
            </button>
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
            <div className="spacer"></div>
          </div>
          {addAttendee && <AddModal />}
          <AttTable attendee={attendee} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
