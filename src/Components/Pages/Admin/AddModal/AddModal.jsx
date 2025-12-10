import { useEffect, useState } from "react";
import "./AddModal.css";
import axios from "axios";
import { HiH1 } from "react-icons/hi2";

function AddModal({ onClose }) {
  const [message, setMessage] = useState("");
  const [newAttendee, setNewAttendee] = useState({
    tzId: "",
    fName: "",
    lName: "",
    institute: "",
    eventTable: JSON.parse(localStorage.getItem("Current Event")).event_table,
  });

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
      const resp = await axios.post(
        "http://localhost/10Dance-V2-php-server/4-controllers/create-new-attendee.php",
        newAttendee
      );
      // console.log(resp.data);
      setMessage("הוספת נוכח הושלמה בהצלחה");
      setTimeout(() => {
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
        {message && (
          <div className="message">
            <h2>{message}</h2>
          </div>
        )}
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
