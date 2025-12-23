import { useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import AuthContext from "./Context/AuthContext";
import CurrentEvent from "./Context/CurrentEventContext";
import EventAttendees from "./Context/EventAttendeesContext";
import ClearScreen from "./Context/ClearScreen";

function App() {
  const [currentEvent, setCurrentEvent] = useState([]);
  // const [eventAttendees, setEventAttendees] = useState([]);
  const [clearScreen, setClearScreen] = useState(false);
  const [eventAttendees, setEventAttendees] = useState([]);

  return (
    <EventAttendees.Provider value={{ eventAttendees, setEventAttendees }}>
      <ClearScreen.Provider value={{ clearScreen, setClearScreen }}>
        {/* <AuthContext.Provider value={{ name: userName }}> */}
        <CurrentEvent.Provider
          value={{
            currentEvent: currentEvent,
            setCurrentEvent: setCurrentEvent,
          }}
        >
          <div className="App">
            <Main />
            {/* {console.log("MODE:", import.meta.env.MODE)}
          {console.log("API:", import.meta.env.VITE_API_BASE_URL)} */}
          </div>
        </CurrentEvent.Provider>
        {/* </AuthContext.Provider> */}
      </ClearScreen.Provider>
    </EventAttendees.Provider>
  );
}

export default App;
