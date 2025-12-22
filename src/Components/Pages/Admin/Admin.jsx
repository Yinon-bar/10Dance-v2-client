import "./Admin.css";
import { useContext, useEffect, useState } from "react";
import AttTable from "./AttTable/AttTable";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import AddModal from "./AddModal/AddModal";
import { IoPersonAdd } from "react-icons/io5";
import ClearScreen from "../../../Context/ClearScreen";
import BounceLoader from "react-spinners/BounceLoader";
import { api } from "../../../API/client";
import { useParams } from "react-router-dom";

function Admin() {
  const { id: eventId } = useParams();
  const [eventTable, setEventTable] = useState();
  const [rerenderTableAfterDelete, setRerenderTableAfterDelete] =
    useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { clearScreen, setClearScreen } = useContext(ClearScreen);

  useEffect(() => {
    if (!eventId) return;
    const fetchAttendeesByEventId = async () => {
      try {
        setLoading(true);
        const resp = await api.get("/get-all-attendees.php?tableId=" + eventId);
        // console.log(resp.data);
        setEventTable(resp.data);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendeesByEventId();
  }, [eventId, clearScreen]);

  return (
    <div className="Admin">
      {clearScreen && <AddModal />}
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
                  setClearScreen(true);
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
