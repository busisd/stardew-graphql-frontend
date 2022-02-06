import "./App.css";
import { DataDisplay, SpecificFishDisplay } from "./DataDisplay";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Data fetched from a GraphQL API</p>
        {/* <DataDisplay /> */}
        <SpecificFishDisplay />
      </header>
    </div>
  );
}

export default App;
