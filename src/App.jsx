import { useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import AuthContext from "./Context/AuthContext";
import CurrentEvent from "./Context/CurrentEventContext";
import ClearScreen from "./Context/ClearScreen";

function App() {
  const [currentEvent, setCurrentEvent] = useState([]);
  const [clearScreen, setClearScreen] = useState({
    btnAdd: false,
    btnEdit: false,
  });

  return (
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
        </div>
      </CurrentEvent.Provider>
      {/* </AuthContext.Provider> */}
    </ClearScreen.Provider>
  );
}

export default App;
