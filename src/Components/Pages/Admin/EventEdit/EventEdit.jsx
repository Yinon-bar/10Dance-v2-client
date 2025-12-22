import { useContext, useEffect, useState } from "react";
import "./EventEdit.css";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { api } from "../../../../API/client";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const EventEdit = ({ event, onClose }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [eventToUpdate, setEventToUpdate] = useState({
    id: event.id,
    name: event.name,
    title: event.title,
    institute: event.institute,
  });
  const navigate = useNavigate();

  const handleAbort = (e) => {
    e.preventDefault();
    onClose();
    // onClose(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent();
  };

  const updateEvent = async () => {
    try {
      console.log(eventToUpdate);

      const resp = await api.put("/update-event.php", eventToUpdate);
      console.log(resp.data);
      setSuccessMessage(resp.data.message);
      setTimeout(() => {
        navigate("/select-event");
      }, 2000);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    console.log(event);
  }, []);

  return (
    <div className="EventEdit">
      <form
        className="editEventForm"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h3 className="formHeading">עריכת אירוע</h3>
        <label>
          <span>שם האירוע</span>
          <input
            value={eventToUpdate.name}
            required
            type="text"
            onChange={(e) =>
              setEventToUpdate({ ...eventToUpdate, name: e.target.value })
            }
          />
        </label>
        <label>
          <span>כותרת האירוע</span>
          <input
            value={eventToUpdate.title}
            required
            type="text"
            onChange={(e) =>
              setEventToUpdate({ ...eventToUpdate, title: e.target.value })
            }
          />
        </label>
        <label>
          <span>מוסד לימודים</span>
          <input
            value={eventToUpdate.institute}
            required
            type="text"
            onChange={(e) =>
              setEventToUpdate({ ...eventToUpdate, institute: e.target.value })
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
