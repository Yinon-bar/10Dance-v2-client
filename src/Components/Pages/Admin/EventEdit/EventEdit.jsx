import { useContext, useEffect, useState } from "react";
import "./EventEdit.css";
import { BiSolidCalendarEdit } from "react-icons/bi";
import CurrentEvent from "../../../../Context/CurrentEventContext";

const EventEdit = () => {
  // const [currentEvent, setCurrentEvent] = useState(true);
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);

  useEffect(() => {
    // console.log(currentEvent);
    // console.log("Edit event rerender");
    // if (
    //   localStorage.getItem("Current Event") != null &&
    //   localStorage.getItem("Current Event").length > 0
    // ) {
    //   setCurrentEvent(false);
    // }
  }, [currentEvent]);

  return (
    <div className={currentEvent ? "EventEdit" : "EventEdit disableBtn"}>
      <BiSolidCalendarEdit size={30} /> &nbsp; עריכת אירוע
    </div>
  );
};

export default EventEdit;
