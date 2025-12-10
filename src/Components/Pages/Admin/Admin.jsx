import axios from "axios";
import "./Admin.css";
import { useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import AddModal from "./AddModal/AddModal";
import { IoPersonAdd } from "react-icons/io5";

function Admin() {
  const [allEvents, setAllEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState([]);
  const [eventTable, setEventTable] = useState([]);
  const [addAttendee, setAddAttendee] = useState(false);
  const [rerenderTableAfterDelete, setRerenderTableAfterDelete] =
    useState(false);

  const handleEvent = async (eventToDisplay) => {
    // console.log(eventToDisplay);
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
    if (allEvents.length > 0) {
      const currentEventTemp = allEvents.find(
        (selectedEvent) => selectedEvent.event_table === eventToDisplay
      );
      setCurrentEvent(currentEventTemp);
      localStorage.setItem("Current Event", JSON.stringify(currentEventTemp));
    } else {
      // console.log("allEvents is empty");
    }
  };

  useEffect(() => {
    setRerenderTableAfterDelete(false);
    axios
      .get(
        "http://localhost/10Dance-V2-php-server/4-controllers/get-all-events.php"
      )
      .then((resp) => {
        setAllEvents(resp.data);
        if (
          localStorage.getItem("Current Event") !== null &&
          localStorage.getItem("Current Event").length > 0
        ) {
          setCurrentEvent(JSON.parse(localStorage.getItem("Current Event")));
          handleEvent(
            JSON.parse(localStorage.getItem("Current Event")).event_table
          );
        }
      });
  }, [rerenderTableAfterDelete]);

  return (
    <div className="Admin">
      {console.log(rerenderTableAfterDelete)}
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
                  selected={event.event_table === currentEvent?.event_table}
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
          {eventTable && (
            <AttTable
              attendee={eventTable}
              rerenderTable={setRerenderTableAfterDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
