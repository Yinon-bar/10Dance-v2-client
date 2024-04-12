import { useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import CurrentTableContext from "./Context/CurrentTableContext";
import AuthContext from "./Context/AuthContext";

function App() {
  const [currentTable, setCurrentTable] = useState([]);
  // const [userName, setUserName] = useState("ינון");

  return (
    // <AuthContext.Provider value={{ name: userName }}>
    <CurrentTableContext.Provider
      value={{
        currentTable: currentTable,
        setCurrentTable: setCurrentTable,
      }}
    >
      <div className="App">
        <Main />
      </div>
    </CurrentTableContext.Provider>
    // </AuthContext.Provider>
  );
}

export default App;
