import { useContext, useEffect, useState } from "react";
import "./AddModal.css";
import ClearScreen from "../../../../Context/ClearScreen";
import { api } from "../../../../API/client";
import { BarLoader } from "react-spinners";
import EventAttendees from "../../../../Context/EventAttendeesContext";

function AddModal({ onClose }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [newAttendee, setNewAttendee] = useState({
    tzId: "",
    fName: "",
    lName: "",
    institute: "",
    eventId: JSON.parse(localStorage.getItem("Current Event")).id,
  });
  const { eventAttendees, setEventAttendees } = useContext(EventAttendees);

  const handleAddAttendee = (e) => {
    e.preventDefault();
    createNewUser();
  };

  const handleAbort = (e) => {
    e.preventDefault();
    onClose();
  };

  const createNewUser = async () => {
    try {
      const resp = await api.post("/create-new-attendee.php", newAttendee);
      // console.log(resp.data);
      setSuccessMessage(resp.data.message);
      setEventAttendees([...eventAttendees, resp.data.data]);
      setTimeout(() => {
        console.log(newAttendee);
        onClose();
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addModal">
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
}

export default AddModal;
