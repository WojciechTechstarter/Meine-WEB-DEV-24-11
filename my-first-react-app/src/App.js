import Titel from "./Titel";
import TierCard from "./TierCard";


function App() {
  return (
    <div>
      <Titel />
      <TierCard name="Bella" art="Dog" krankheit="Fever" />
      <TierCard name="Milo" art="Cat" krankheit="Cold" />
    </div>
  );
}

export default App;