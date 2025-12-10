import axios from "axios";
import "./AttTable.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

function AttTable(props) {
  const [message, setMessage] = useState("");

  const handleDelete = (attendeeObj) => {
    console.log(attendeeObj);
    removeAttendee(attendeeObj);
  };

  const removeAttendee = async (attendeeToDelte) => {
    try {
      const resp = await axios.delete(
        `http://localhost/10Dance-V2-php-server/4-controllers/delete-attendee.php?table_name=dec_geo&id=${attendeeToDelte.id}`
      );
      console.log(resp);
      setMessage(resp.data);
      setTimeout(() => {
        setMessage("");
        props.rerenderTable(true);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

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
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>מחיקה</th>
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
              <td>{att.tz_id}</td>
              <td>{att.fName}</td>
              <td>{att.lName}</td>
              <td>{att.institute}</td>
              <td>{att.isArrived}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttTable;
