import { useContext, useEffect, useState } from "react";
import "./Client.css";
import axios from "axios";
import NumberContext from "../../../Context/NumberContext";
import PrintAtt from "../../PrintAtt/PrintAtt";
import ListNumpad from "../../NumPad/ListNumpad/ListNumpad";
import Header from "../../Header/Header";
import CurrentEvent from "../../../Context/CurrentEventContext";

function Client() {
  const [inputValue, setInputValue] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [printAtt, setPrintAtt] = useState(false);
  const [attendee, setAttendee] = useState([]);
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);

  const showMsg = (arg, status = 1) => {
    setMsg(arg);
    setTimeout(() => {
      setMsg(null);
      status == 1 && setPrintAtt(true);
      setInputValue("");
    }, 3000);
  };

  const sendId = (e) => {
    e.preventDefault();
    const tzId = e.target.elements.tzId.value;
    setLoading(true);
    axios
      .get(
        `http://localhost/10Dance-V2-php-server/4-controllers/get-attendee-by-tz.php?tz=${tzId}&table=${currentEvent.event_table}`
      )
      .then((resp) => {
        console.log(resp.data);
        setAttendee(resp.data);
        setLoading(false);
        resp.data.length > 0
          ? showMsg("נרשמת בהצלחה!")
          : showMsg("אינך רשום במערכת, אנא גש לעמדת הרישום", 0);
      })
      .catch((err) => console.log(err));
  };

  const insertToInput = (e) => {
    console.log(e);
    setInputValue(e);
  };

  useEffect(() => {
    console.log(currentEvent);
  }, []);

  return (
    <NumberContext.Provider
      value={{ inputValue: inputValue, setInputValue: setInputValue }}
    >
      <div className="Client">
        <Header />
        {msg && (
          <div className="loading">
            <h1>{msg}</h1>
          </div>
        )}
        {loading && (
          <div className="loading">
            <h1>טוען נתונים...</h1>
          </div>
        )}
        {printAtt && (
          <PrintAtt attendee={attendee[0]} onDone={() => setPrintAtt(false)} />
        )}
        <div className="title-section">
          <h1 className="title welcome">ברוכים הבאים</h1>
          <h1 className="title campus">{currentEvent.event_name}</h1>
          <h1 className="title welcome">{currentEvent.event_title}</h1>
        </div>
        <h2 className="title cta">
          נא הכנס ת.ז. מלאה <span className="without">כולל</span> ספרת ביקורת
        </h2>
        <form onSubmit={sendId}>
          <input
            onChange={(e) => insertToInput(e.target.value)}
            className="input-text"
            type="text"
            value={inputValue}
            name="tzId"
          />
          <div className="numpad">
            <ListNumpad />
          </div>
        </form>
      </div>
    </NumberContext.Provider>
  );
}

export default Client;
