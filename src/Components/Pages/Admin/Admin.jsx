import "./Admin.css";
import { useContext, useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import AddModal from "./AddModal/AddModal";
import { IoPersonAdd } from "react-icons/io5";
import BounceLoader from "react-spinners/BounceLoader";
import { api } from "../../../API/client";
import { useParams } from "react-router-dom";
import EventAttendees from "../../../Context/EventAttendeesContext";

function Admin() {
  const { id: eventId } = useParams();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { eventAttendees, setEventAttendees } = useContext(EventAttendees);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    const fetchAttendeesByEventId = async () => {
      try {
        setLoading(true);
        const resp = await api.get("/get-all-attendees.php?tableId=" + eventId);
        // console.log(resp.data);
        // setEventTable(resp.data);
        setEventAttendees(resp.data);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendeesByEventId();
  }, [eventId]);

  useEffect(() => {
    // כדי לכבות את הגלילה כשהמודל פתוח
    showModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showModal]);

  return (
    <div className="Admin">
      {showModal && <AddModal onClose={() => setShowModal(false)} />}
      <HeaderAdmin />
      <div className="container">
        <div className="content">
          <h1>ברוכים הבאים לממשק הניהול</h1>
          <h3></h3>
          <div className="buttons">
            <div className="rightSection">
              <button
                className="btnAdd"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <IoPersonAdd size={30} color="#2A3D43" />
                הוספת נוכח
              </button>
            </div>
            <div className="middleSection">
              <h3 className="eventTitle">
                {JSON.parse(localStorage.getItem("Current Event")).title}
              </h3>
            </div>
            <div className="leftSection">
              {eventAttendees?.length > 0 && (
                <div className="eventDetails">
                  <h4 className="totalAttendee">
                    סה"כ רשומים לאירוע זה: &nbsp;
                    <span className="totalCount">{eventAttendees?.length}</span>
                  </h4>
                  <h4 className="totalArrived">
                    מתוכם הגיעו: &nbsp;
                    <span className="arrived">
                      {
                        eventAttendees?.filter(
                          (attendee) => attendee.is_arrive === 1
                        ).length
                      }
                    </span>
                  </h4>
                </div>
              )}
            </div>
          </div>
          {loading && (
            <BounceLoader
              className="loader"
              color="rgb(225, 238, 248)"
              size={100}
            />
          )}
          {eventAttendees && msg.length < 1 && (
            <AttTable attendee={eventAttendees} />
          )}
          {msg && <h2 className="noRecords">{msg}</h2>}
        </div>
      </div>
    </div>
  );
}

export default Admin;
