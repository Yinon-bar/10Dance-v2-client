import { useEffect, useState } from "react";
import "./AddModal.css";
import Admin from "../Admin";

function AddModal({ onClose }) {
  const [closeModal, setCloseModal] = useState(false);

  const handleAddAttendee = (e) => {
    e.preventDefault();
  };

  const handleAbort = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="addModal">
      <form>
        <h3 className="formHeading">הוספת נוכח</h3>
        <label>
          <span>שם פרטי</span>
          <input type="text" name="" id="" />
        </label>
        <label>
          <span>שם משפחה</span>
          <input type="text" name="" id="" />
        </label>
        <label>
          <span>תעודת זהות</span>
          <input type="text" name="" id="" />
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
