import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>🌍 Welcome to the Countries App!</h1>
      <p>Click below to explore countries of the world.</p>
      <Link to="/countries">See Countries</Link>
    </div>
  );
}

export default App;
