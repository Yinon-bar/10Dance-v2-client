import axios from "axios";
import "./AttTable.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import EditModal from "../EditModal/EditModal";
import ClearScreen from "../../../../Context/ClearScreen";
import { api } from "../../../../API/client";

function AttTable(props) {
  const [message, setMessage] = useState("");
  const [isEditAttendee, setIsEditAttendee] = useState(false);
  const [attendeeObj, setAttendeeObj] = useState([]);
  const { clearScreen, setClearScreen } = useContext(ClearScreen);

  const handleDelete = (attendeeObj) => {
    console.log(attendeeObj);
    removeAttendee(attendeeObj);
  };

  const handleEdit = (attendeeObj) => {
    // console.log(props.onClose);
    // console.log(attendeeObj);
    setClearScreen({ ...clearScreen, btnEdit: true });
    setAttendeeObj(attendeeObj);
    editAttendee(attendeeObj);
  };

  const removeAttendee = async (attendeeToDelte) => {
    try {
      const resp = await api.delete(
        `/delete-attendee.php?table_name=dec_geo&id=${attendeeToDelte.id}`
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

  const editAttendee = async (attendeeToEdit) => {
    // console.log(attendeeToEdit);
    setIsEditAttendee(true);
    // try {
    //   const resp = await axios.delete(
    //     `http://localhost/10Dance-V2-php-server/4-controllers/delete-attendee.php?table_name=dec_geo&id=${attendeeToDelte.id}`
    //   );
    //   console.log(resp);
    //   setMessage(resp.data);
    //   setTimeout(() => {
    //     setMessage("");
    //     props.rerenderTable(true);
    //   }, 3000);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {}, []);

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
      {clearScreen.btnEdit && <EditModal attendeeObj={attendeeObj} />}
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
