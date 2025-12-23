import "./AttTable.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import EditModal from "../EditModal/EditModal";
import { api } from "../../../../API/client";
import EventAttendees from "../../../../Context/EventAttendeesContext";

function AttTable(props) {
  const [message, setMessage] = useState("");
  const [attendeeObj, setAttendeeObj] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const { eventAttendees, setEventAttendees } = useContext(EventAttendees);

  const handleDelete = (attendeeObj) => {
    removeAttendee(attendeeObj);
  };

  const handleEdit = (attendeeObj) => {
    setShowEditModal(true);
    setAttendeeObj(attendeeObj);
  };

  const removeAttendee = async (attendeeToDelte) => {
    try {
      const resp = await api.delete(
        `/delete-attendee.php?table_name=dec_geo&id=${attendeeToDelte.id}`
      );
      setMessage(resp.data);
      setTimeout(() => {
        setMessage("");
        const newEventAttendees = eventAttendees.filter(
          (attendee) => attendee.id !== attendeeToDelte.id
        );
        setEventAttendees(newEventAttendees);
        // navigate("/admin/91");
        // props.rerenderTable(true);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // כדי לכבות את הגלילה כשהמודל פתוח
    showEditModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showEditModal]);

  if (message) {
    return (
      <div className="AttTable">
        <div className="messageModal">
          <h1>
            <FaCheckCircle size={100} />
          </h1>
          <h1 className="deleteMessage">המשתמש נמחק בהצלחה</h1>
        </div>
      </div>
    );
  }

  // console.log(props.attendee);
  return (
    <div className="AttTable">
      {showEditModal && (
        <EditModal
          attendeeObj={attendeeObj}
          onClose={() => setShowEditModal(false)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>מחיקה</th>
            <th>עריכה</th>
            <th>תעודת זהות</th>
            <th>שם פרטי</th>
            <th>שם משפחה</th>
            <th>מוסד לימודים</th>
            <th>נוכח</th>
          </tr>
        </thead>
        <tbody>
          {props.attendee.map((att) => (
            <tr key={att.id}>
              <td>{att.id}</td>
              <td>
                <FaTrashAlt
                  className="trash"
                  onClick={() => handleDelete(att)}
                />
              </td>
              <td>
                <FaUserEdit
                  className="edit"
                  size={25}
                  onClick={() => handleEdit(att)}
                />
              </td>
              <td>{att.tz_id}</td>
              <td>{att.first_name}</td>
              <td>{att.last_name}</td>
              <td>{att.institute}</td>
              <td>{att.is_arrive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttTable;
