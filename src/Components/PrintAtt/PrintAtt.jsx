import { useEffect } from "react";
import "./PrintAtt.css";

function PrintAtt(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();

      // אחרי ההדפסה – מודיע להורה שסיימנו
      if (props.onDone) {
        props.onDone();
      }
    }, 100);
    // window.location.reload(false);
  }, []);
  console.log(props.attendee);
  return (
    <div className="PrintAtt">
      <div className="name">
        <h1>{props.attendee.fName}</h1>
        <h1>{props.attendee.lName}</h1>
      </div>
      <h2>{props.attendee.institute}</h2>
    </div>
  );
}

export default PrintAtt;
