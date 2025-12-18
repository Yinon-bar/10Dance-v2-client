import { useState } from "react";
import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import "./NewEvent.css";
import axios from "axios";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function NewEvent() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [data, setData] = useState({
    institute: "",
    eventName: "",
    eventTitle: "",
    eventLogo: "",
    eventTable: "",
  });
  const handleSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();
    // console.log(data);
    const formData = new FormData();
    formData.append("eventName", data.eventName);
    formData.append("eventTitle", data.eventTitle);
    formData.append("eventLogo", data.eventLogo);
    formData.append("eventTable", data.eventTable);
    formData.append("institute", data.institute);
    createEvent(formData);
  };

  const createEvent = async (formData) => {
    try {
      const resp = await axios.post(
        "http://localhost/10Dance-V2-php-server/4-controllers/new-event.php",
        formData
      );
      setSuccessMessage(resp.data.message);
      setTimeout(() => {
        navigate("/admin");
      }, [2500]);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="NewEvent">
      <HeaderAdmin />
      <div className="container">
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="formHeader">
              <h2 className="primary">יצירת אירוע חדש</h2>
            </div>
            <label>
              שם המוסד
              <input
                required
                type="text"
                onChange={(e) =>
                  setData({ ...data, institute: e.target.value })
                }
              />
            </label>
            <label>
              שם האירוע
              <input
                required
                type="text"
                onChange={(e) =>
                  setData({ ...data, eventName: e.target.value })
                }
              />
            </label>
            <label>
              כותרת האירוע <br />
              (יופיע במסך קבלת הפנים)
              <input
                required
                type="text"
                onChange={(e) =>
                  setData({ ...data, eventTitle: e.target.value })
                }
              />
            </label>
            <label>
              העלאת לוגו האירוע
              <input
                type="file"
                name="file"
                onChange={(e) =>
                  setData({ ...data, eventLogo: e.target.files[0] })
                }
              />
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
            {errorMessage.length > 0 ? (
              <h2 className="errorMessage">{errorMessage}</h2>
            ) : null}
            {successMessage.length > 0 ? (
              <>
                <BarLoader color="#102125" width="200" height="8" />
                <h2 className="successMessage">{successMessage}</h2>
              </>
            ) : null}
            <div className="navigationBtns">
              <input
                className="btn btn-primary"
                type="submit"
                value="צור אירוע"
              />
              <NavLink className="backHome" to={"/admin"}>
                ביטול
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewEvent;
