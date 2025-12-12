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
  const [eventTable, setEventTable] = useState();
  const [addAttendee, setAddAttendee] = useState(false);
  const [rerenderTableAfterDelete, setRerenderTableAfterDelete] =
    useState(false);

  const [msg, setMsg] = useState("");

  const handleEvent = async (eventId) => {
    console.log(eventId);
    getCurrentEvent(eventId);
    try {
      const resp = await axios.get(
        "http://localhost/10Dance-V2-php-server/4-controllers/get-all-attendees.php?tableId=" +
          eventId
      );
      console.log(resp.data);
      setMsg("");
      setEventTable(resp.data);
    } catch (error) {
      setCurrentEvent([]);
      setMsg(error.response.data.message);
      localStorage.removeItem("Current Event");
      console.log(error.response.data.message);
    }
  };

  const getCurrentEvent = (eventToDisplay) => {
    if (allEvents.length > 0) {
      console.log(eventToDisplay);
      console.log(allEvents);

      const currentEventTemp = allEvents.find(
        (selectedEvent) => selectedEvent.id == eventToDisplay
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
        console.log(resp.data);
        setAllEvents(resp.data);
        if (
          localStorage.getItem("Current Event") !== null &&
          localStorage.getItem("Current Event").length > 0
        ) {
          setCurrentEvent(JSON.parse(localStorage.getItem("Current Event")));
          handleEvent(JSON.parse(localStorage.getItem("Current Event")).id);
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
              className="selectBox"
            >
              <option defaultChecked hidden value="">
                ללא
              </option>
              {allEvents.map((event, index) => (
                <option
                  selected={event.id === currentEvent?.id}
                  key={index}
                  value={event.id}
                >
                  {event.title}
                </option>
              ))}
            </select>
            <div className="spacer"></div>
          </div>
          {addAttendee && <AddModal onClose={() => setAddAttendee(false)} />}
          {eventTable && msg.length < 1 && (
            <AttTable
              attendee={eventTable}
              rerenderTable={setRerenderTableAfterDelete}
            />
          )}
          {msg && <h2 className="noRecords">{msg}</h2>}
        </div>
      </div>
    </div>
  );
}

export default Admin;
