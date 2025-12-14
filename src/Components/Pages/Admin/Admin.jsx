import axios from "axios";
import "./Admin.css";
import { useContext, useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import AddModal from "./AddModal/AddModal";
import { IoPersonAdd } from "react-icons/io5";
import CurrentEvent from "../../../Context/CurrentEventContext";
import ClearScreen from "../../../Context/ClearScreen";

function Admin() {
  const [allEvents, setAllEvents] = useState([]);
  const [eventTable, setEventTable] = useState();
  const [rerenderTableAfterDelete, setRerenderTableAfterDelete] =
    useState(false);
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);
  const { clearScreen, setClearScreen } = useContext(ClearScreen);

  const [msg, setMsg] = useState("");

  const handleEvent = async (eventId) => {
    // console.log(eventId);
    getCurrentEvent(eventId);
    try {
      const resp = await axios.get(
        "http://localhost/10Dance-V2-php-server/4-controllers/get-all-attendees.php?tableId=" +
          eventId
      );
      setMsg("");
      setEventTable(resp.data);
    } catch (error) {
      setCurrentEvent([]);
      // console.log(currentEvent);
      setMsg(error.response.data.message);
      localStorage.removeItem("Current Event");
      // console.log(error.response.data.message);
    }
  };

  const getCurrentEvent = (eventToDisplay) => {
    if (allEvents.length > 0) {
      // console.log(eventToDisplay);
      // console.log(allEvents);
      const currentEventTemp = allEvents.find(
        (selectedEvent) => selectedEvent.id == eventToDisplay
      );
      setCurrentEvent(currentEventTemp);
      localStorage.setItem("Current Event", JSON.stringify(currentEventTemp));
    } else {
      // console.log("allEvents is empty");
    }
  };

  const getAllEvents = async () => {
    try {
      const resp = await axios.get(
        "http://localhost/10Dance-V2-php-server/4-controllers/get-all-events.php"
      );
      let validateResp;
      // בדיקה שהתשובה שקיבלנו היא אכן מערך, במידה ולא, יש בעיה בדאטהבייס ולכן יש להציג את התקלה
      if (Array.isArray(resp.data)) {
        validateResp = resp.data;
      } else {
        validateResp = [];
        setMsg(resp.data);
      }
      console.log(resp);
      setAllEvents(validateResp);
      if (
        localStorage.getItem("Current Event") !== null &&
        localStorage.getItem("Current Event").length > 0
      ) {
        setCurrentEvent(JSON.parse(localStorage.getItem("Current Event")));
        handleEvent(JSON.parse(localStorage.getItem("Current Event")).id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(allEvents);
    getAllEvents();
    setRerenderTableAfterDelete(false);
  }, [rerenderTableAfterDelete]);

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
                setClearScreen({ ...clearScreen, btnAdd: true });
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
              {allEvents.length > 0
                ? allEvents.map((event, index) => (
                    <option
                      selected={event.id === currentEvent?.id}
                      key={index}
                      value={event.id}
                    >
                      {event.title}
                    </option>
                  ))
                : null}
            </select>
            <div className="spacer"></div>
          </div>
          {clearScreen.btnAdd && <AddModal />}
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
