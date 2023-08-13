import { useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import CurrentTableContext from "./Context/CurrentTableContext";

function App() {
    const [currentTable, setCurrentTable] = useState([]);
    // const setCurrentTable = {};

    return (
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
    );
}

export default App;
