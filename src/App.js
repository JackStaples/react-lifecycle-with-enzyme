import React, { useState } from "react";
import LifecycleDropdown from "./components/LifecycleDropdown";

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  return (
    <div className="App">
      <h1>React Lifecycle Testing with Enzyme</h1>
      <LifecycleDropdown
        value={selectedPlayer}
        onChange={(event) => {
          if (event?.target?.value) setSelectedPlayer(event?.target?.value);
        }}
      />
    </div>
  );
}

export default App;
