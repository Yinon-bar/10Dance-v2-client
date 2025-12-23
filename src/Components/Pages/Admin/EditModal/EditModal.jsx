import { useContext, useEffect, useState } from "react";
import "./EditModal.css";
import { api } from "../../../../API/client";
import EventAttendees from "../../../../Context/EventAttendeesContext";

function EditModal(props) {
  const [message, setMessage] = useState("");
  const [attendeeToEdit, setAttendeeToEdit] = useState({
    id: props.attendeeObj.id,
    tzId: props.attendeeObj.tz_id,
    fName: props.attendeeObj.first_name,
    lName: props.attendeeObj.last_name,
    institute: props.attendeeObj.institute,
    eventId: props.attendeeObj.event_id,
  });
  const { eventAttendees, setEventAttendees } = useContext(EventAttendees);

  const handleAddAttendee = (e) => {
    e.preventDefault();
    updateAttendee();
  };

  const handleAbort = (e) => {
    e.preventDefault();
    props.onClose();
    // setClearScreen({ ...clearScreen, btnEdit: false });
  };

  const updateAttendee = async () => {
    console.log(attendeeToEdit);

    try {
      const resp = await api.put("/update-attendee.php", attendeeToEdit);
      console.log(resp.data);
      setMessage(resp.data.message);
      setTimeout(() => {
        console.log();
        const updatedAttendee = resp.data.data[0];
        setEventAttendees(
          eventAttendees.map((attendeeToReplace) =>
            updatedAttendee.id === attendeeToReplace.id
              ? updatedAttendee
              : attendeeToReplace
          )
        );
        props.onClose(true);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EditModal">
      <form
        onSubmit={(e) => {
          handleAddAttendee(e);
        }}
      >
        <h3 className="formHeading">עריכת נוכח</h3>
        <label>
          <span>שם פרטי</span>
          <input
            required
            type="text"
            value={attendeeToEdit.fName}
            onChange={(e) =>
              setAttendeeToEdit({ ...attendeeToEdit, fName: e.target.value })
            }
          />
        </label>
        <label>
          <span>שם משפחה</span>
          <input
            required
            type="text"
            value={attendeeToEdit.lName}
            onChange={(e) =>
              setAttendeeToEdit({ ...attendeeToEdit, lName: e.target.value })
            }
          />
        </label>
        <label>
          <span>תעודת זהות</span>
          <input
            required
            type="text"
            value={attendeeToEdit.tzId}
            onChange={(e) =>
              setAttendeeToEdit({ ...attendeeToEdit, tzId: e.target.value })
            }
          />
        </label>
        <label>
          <span>מוסד לימודים</span>
          <input
            required
            type="text"
            value={attendeeToEdit.institute}
            onChange={(e) =>
              setAttendeeToEdit({
                ...attendeeToEdit,
                institute: e.target.value,
              })
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

export default EditModal;
