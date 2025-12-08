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
  const [allEvents, setAllEvents] = useState([]);
  const [addAttendee, setAddAttendee] = useState(false);
  const [eventTable, setEventTable] = useState([]);
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);

  const handleEvent = async (eventToDisplay) => {
    console.log(eventToDisplay);
    getCurrentEvent(eventToDisplay);
    try {
      const resp = await axios.get(
        "http://localhost/10Dance-V2-php-server/4-controllers/get-all-attendees.php?tableName=" +
          eventToDisplay
      );
      setEventTable(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentEvent = (eventToDisplay) => {
    // console.log(currentTable);
    const currentEventTemp = allEvents.find(
      (selectedEvent) => selectedEvent.event_table === eventToDisplay
    );
    setCurrentEvent(currentEventTemp);
    localStorage.setItem("Current Event", JSON.stringify(currentEventTemp));
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost/10Dance-V2-php-server/4-controllers/get-all-events.php"
      )
      .then((resp) => {
        console.log(resp.data);
        setAllEvents(resp.data);
        if (
          localStorage.getItem("Current Event") !== null &&
          localStorage.getItem("Current Event").length > 0
        ) {
          console.log("Not null");
          // setCurrentTable(localStorage.getItem("Current Table"));
          // getCurrentEvent();
          // handleEvent(localStorage.getItem("Current Table"));
        }
      });
    // .catch((err) => console.log(err));
  }, []);

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
              <IoPersonAdd size={30} color="#20718B" />
            </button>
            <select
              onChange={(e) => handleEvent(e.target.value)}
              name="בחר אירוע להצגה"
            >
              <option defaultChecked hidden value="">
                ללא
              </option>
              {allEvents.map((event, index) => (
                <option
                  selected={event.event_table === currentEvent}
                  key={index}
                  value={event.event_table}
                >
                  {event.event_name}
                </option>
              ))}
            </select>
            <div className="spacer"></div>
          </div>
          {addAttendee && <AddModal onClose={() => setAddAttendee(false)} />}
          {/* <AttTable attendee={attendee} /> */}
        </div>
      </div>
    </div>
  );
}

export default Admin;
