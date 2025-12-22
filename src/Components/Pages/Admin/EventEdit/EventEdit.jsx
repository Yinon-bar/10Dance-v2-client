import { useContext, useEffect, useState } from "react";
import "./EventEdit.css";
import { BiSolidCalendarEdit } from "react-icons/bi";
import CurrentEvent from "../../../../Context/CurrentEventContext";

const EventEdit = () => {
  // const [currentEvent, setCurrentEvent] = useState(true);
  const [successMessage, serSuccessMessage] = useState("");
  const [eventToUpdate, setEventToUpdate] = useState({
    id: "",
    name: "",
    title: "",
    institute: "",
  });
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);

  useEffect(() => {
    // console.log(currentEvent);
    // console.log("Edit event rerender");
    // if (
    //   localStorage.getItem("Current Event") != null &&
    //   localStorage.getItem("Current Event").length > 0
    // ) {
    //   setCurrentEvent(false);
    // }
  }, [currentEvent]);

  return (
    <div className="EventEdit">
      <form
        onSubmit={(e) => {
          handleAddAttendee(e);
        }}
      >
        <h3 className="formHeading">הוספת נוכח</h3>
        <label>
          <span>שם פרטי</span>
          <input
            required
            type="text"
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, fName: e.target.value })
            }
          />
        </label>
        <label>
          <span>שם משפחה</span>
          <input
            required
            type="text"
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, lName: e.target.value })
            }
          />
        </label>
        <label>
          <span>תעודת זהות</span>
          <input
            required
            type="text"
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, tzId: e.target.value })
            }
          />
        </label>
        <label>
          <span>מוסד לימודים</span>
          <input
            required
            type="text"
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, institute: e.target.value })
            }
          />
        </label>
        {successMessage.length > 0 ? (
          <>
            <BarLoader
              className="loader"
              color="#102125"
              width="200"
              height="8"
            />
            <h2 className="successMessage">{successMessage}</h2>
          </>
        ) : null}
        <div className="btns">
          <input
            className="btn btn-primary submit"
            type="submit"
            value="אישור"
          />
          <button className="btn btn-secondary" onClick={(e) => handleAbort(e)}>
            ביטול
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventEdit;
