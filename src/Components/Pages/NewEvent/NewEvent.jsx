import { useState } from "react";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import "./NewEvent.css";
import axios from "axios";

function NewEvent() {
  const [data, setData] = useState({
    eventName: "",
    eventTitle: "",
    eventTable: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    const formData = new FormData();
    formData.append("eventName", data.eventName);
    formData.append("eventTitle", data.eventTitle);
    formData.append("eventTable", data.eventTable);

    axios
      .post(
        "http://localhost/10Dance-V2-php-server/API/attendees/new-event.php",
        formData
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="NewEvent">
      <HeaderAdmin />
      <div className="container">
        <div className="content">
          <h2 className="primary">יצירת אירוע חדש</h2>
          <form action="" onSubmit={handleSubmit}>
            <label>
              שם האירוע
              <input
                type="text"
                onChange={(e) =>
                  setData({ ...data, eventName: e.target.value })
                }
              />
            </label>
            <label>
              כותרת האירוע (יופיע במסך קבלת הפנים)
              <input
                type="text"
                onChange={(e) =>
                  setData({ ...data, eventTitle: e.target.value })
                }
              />
            </label>
            <label>
              העלאת לוגו האירוע
              <input type="file" name="" id="" />
            </label>
            <label>
              יש לצרף קובץ בפורמט Excel, Csv
              <input
                type="file"
                name="file"
                onChange={(e) =>
                  setData({ ...data, eventTable: e.target.files[0] })
                }
              />
            </label>
            <input
              className="btn btn-primary"
              type="submit"
              value="צור אירוע"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewEvent;
