import "./Admin.css";
import { useContext, useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import AddModal from "./AddModal/AddModal";
import { IoPersonAdd } from "react-icons/io5";
import CurrentEvent from "../../../Context/CurrentEventContext";
import ClearScreen from "../../../Context/ClearScreen";
import BounceLoader from "react-spinners/BounceLoader";
import { api } from "../../../API/client";
import EventEdit from "./EventEdit/EventEdit";
import EventDelete from "./EventDelete/EventDelete";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmDelete from "./EventDelete/ConfirmDelete/ConfirmDelete";
import { useParams } from "react-router-dom";

function Admin() {
  const { id: eventId } = useParams();

  const [allEvents, setAllEvents] = useState([]);
  const [eventTable, setEventTable] = useState();
  const [rerenderTableAfterDelete, setRerenderTableAfterDelete] =
    useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);
  const { clearScreen, setClearScreen } = useContext(ClearScreen);
  const [showModal, setShowModal] = useState({
    editEventModal: false,
    deleteEventModal: false,
    addEventModal: false,
    addAttendeeModal: false,
  });

  const handleDelete = () => {
    console.log(currentEvent);
    setShowModal({ ...showModal, deleteEventModal: true });
    // setClearScreen({ ...clearScreen, btnEventAdd: true });
  };

  useEffect(() => {
    if (!eventId) return;
    const fetchAttendeesByEventId = async () => {
      try {
        setLoading(true);
        const resp = await api.get("/get-all-attendees.php?tableId=" + eventId);
        console.log(resp.data);
        setEventTable(resp.data);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendeesByEventId();
  }, [eventId]);

  return (
    <div className="Admin">
      {clearScreen.btnAdd && <AddModal />}
      {showModal?.deleteEventModal && <ConfirmDelete onClose={setShowModal} />}
      <HeaderAdmin />
      <div className="container">
        <div className="content">
          <h1>ברוכים הבאים לממשק הניהול</h1>
          <h3></h3>
          <div className="buttons">
            <div className="rightSection">
              {eventTable?.length > 0 ? (
                <button
                  className="btnAdd"
                  onClick={() => {
                    setClearScreen({ ...clearScreen, btnAdd: true });
                  }}
                >
                  <IoPersonAdd size={30} color="#2A3D43" />
                  הוספת נוכח
                </button>
              ) : null}
              {eventTable?.length > 0 && (
                <div className="eventDetails">
                  <h4 className="totalAttendee">
                    סה"כ רשומים לאירוע זה: &nbsp;
                    <span className="totalCount">{eventTable?.length}</span>
                  </h4>
                  <h4 className="totalArrived">
                    מתוכם הגיעו: &nbsp;
                    <span className="arrived">
                      {
                        eventTable?.filter(
                          (attendee) => attendee.is_arrive === 1
                        ).length
                      }
                    </span>
                  </h4>
                </div>
              )}
            </div>
            <div className="middleSection">
              <h3 className="eventTitle">
                {JSON.parse(localStorage.getItem("Current Event")).title}
              </h3>
            </div>
            <div className="leftSection">
              {eventTable.length > 0 ? (
                <button
                  className="deleteEvent"
                  onClick={(e) => handleDelete(e)}
                >
                  <FaTrashAlt className="trash" size={25} /> &nbsp; מחיקת אירוע
                </button>
              ) : null}
              {eventTable.length > 0 ? <EventEdit /> : null}
            </div>
          </div>
          {loading && (
            <BounceLoader
              className="loader"
              color="rgb(225, 238, 248)"
              size={100}
            />
          )}
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
