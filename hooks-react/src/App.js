import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [showText, setShowText] = useState(true);
  const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    console.log("Page has loaded!");
  }, []);

  return (
    <div style={{ backgroundColor: bgColor, padding: "30px", fontFamily: "sans-serif" }}>
      <h1>React Hooks Easter Homework</h1>

      {/* Counter */}
      <div>
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(count + 1)}>➕ Plus</button>
        <button onClick={() => setCount(count - 1)}>➖ Minus</button>
      </div>

      {/* Toggle Text */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setShowText(!showText)}>
          {showText ? "Hide Text" : "Show Text"}
        </button>
        {showText && <p>This is some toggleable text!</p>}
      </div>

      {/* Background Color Switcher */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setBgColor(bgColor === "white" ? "lightblue" : "white")}>
          Switch Background Color
        </button>
      </div>
    </div>
  );
}

export default App;
