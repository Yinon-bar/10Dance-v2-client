import { useEffect, useState } from "react";
import "./AddModal.css";
import Admin from "../Admin";
import axios from "axios";

function AddModal({ onClose }) {
  const [closeModal, setCloseModal] = useState(false);
  const [newAttendee, setNewAttendee] = useState({
    tzId: "",
    firstName: "",
    lastName: "",
    institute: "",
    eventTable: localStorage.getItem("Current Table"),
  });

  const handleAddAttendee = (e) => {
    e.preventDefault();
  };

  const handleAbort = (e) => {
    e.preventDefault();
    onClose();
  };

  const createNewUser = async () => {
    const resp = await axios.post(
      "http://localhost/10Dance-V2-php-server/4-controllers/create-new-attendee.php",
      newAttendee
    );
    console.log(resp.data);
  };

  return (
    <div className="addModal">
      {console.log(newAttendee)}
      <form>
        <h3 className="formHeading">הוספת נוכח</h3>
        <label>
          <span>שם פרטי</span>
          <input
            type="text"
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, firstName: e.target.value })
            }
          />
        </label>
        <label>
          <span>שם משפחה</span>
          <input
            type="text"
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, lastName: e.target.value })
            }
          />
        </label>
        <label>
          <span>תעודת זהות</span>
          <input
            type="text"
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, tzId: e.target.value })
            }
          />
        </label>
        <label>
          <span>מוסד לימודים</span>
          <input
            type="text"
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, institute: e.target.value })
            }
          />
        </label>
        <div className="btns">
          <input
            className="btn btn-primary submit"
            type="submit"
            value="אישור"
            onClick={(e) => {
              handleAddAttendee(e);
            }}
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
