// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [type, setType] = useState("e");
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchNumbers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:9876/numbers/${type}`);
//       setResponse(res.data);
//     } catch (err) {
//       console.error("Fetch failed", err);
//       alert("Failed to fetch numbers.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 40, fontFamily: "Arial" }}>
//       <h1>Average Calculator</h1>

//       <div style={{ marginBottom: 20 }}>
//         <label>Select Number Type: </label>
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="p">Prime</option>
//           <option value="f">Fibonacci</option>
//           <option value="e">Even</option>
//           <option value="r">Random</option>
//         </select>
//         <button onClick={fetchNumbers} style={{ marginLeft: 10 }}>
//           {loading ? "Loading" : "Fetch"}
//         </button>
//       </div>

//       {response && (
//         <>
//           <div>
//             <strong>Previous Window:</strong>
//             <pre>{JSON.stringify(response.windowPrevState, null, 2)}</pre>
//           </div>
//           <div>
//             <strong>Current Window:</strong>
//             <pre>{JSON.stringify(response.windowCurrState, null, 2)}</pre>
//           </div>
//           <div>
//             <strong>New Numbers Fetched:</strong>
//             <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
//           </div>
//           <div>
//             <strong>Average:</strong> {response.avg}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [response, setResponse] = useState(null);
  const [loadingType, setLoadingType] = useState("");

  const fetchNumbers = async (type) => {
    setLoadingType(type);
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${type}`);
      setResponse({ ...res.data, type });
    } catch (err) {
      console.error("Fetch failed", err);
      alert("Failed to fetch numbers.");
    } finally {
      setLoadingType("");
    }
  };

  const buttonStyle = {
    marginRight: 10,
    padding: "8px 16px",
    fontSize: 16,
    cursor: "pointer",
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Average Calculator</h1>

      <div style={{ marginBottom: 20 }}>
        <button
          style={buttonStyle}
          onClick={() => fetchNumbers("p")}
          disabled={loadingType === "p"}
        >
          {loadingType === "p" ? "Loading..." : "Prime"}
        </button>

        <button
          style={buttonStyle}
          onClick={() => fetchNumbers("f")}
          disabled={loadingType === "f"}
        >
          {loadingType === "f" ? "Loading..." : "Fibonacci"}
        </button>

        <button
          style={buttonStyle}
          onClick={() => fetchNumbers("e")}
          disabled={loadingType === "e"}
        >
          {loadingType === "e" ? "Loading..." : "Even"}
        </button>

        <button
          style={buttonStyle}
          onClick={() => fetchNumbers("r")}
          disabled={loadingType === "r"}
        >
          {loadingType === "r" ? "Loading..." : "Random"}
        </button>
      </div>

      {response && (
        <div style={{ marginTop: 30 }}>
          <h2>Results for: {getTypeName(response.type)}</h2>
          <div>
            <strong>Previous Window:</strong>
            <pre>{JSON.stringify(response.windowPrevState, null, 2)}</pre>
          </div>
          <div>
            <strong>Current Window:</strong>
            <pre>{JSON.stringify(response.windowCurrState, null, 2)}</pre>
          </div>
          <div>
            <strong>New Numbers Fetched:</strong>
            <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
          </div>
          <div>
            <strong>Average:</strong> {response.avg}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to get readable names
function getTypeName(type) {
  switch (type) {
    case "p":
      return "Prime Numbers";
    case "f":
      return "Fibonacci Numbers";
    case "e":
      return "Even Numbers";
    case "r":
      return "Random Numbers";
    default:
      return "";
  }
}

export default App;
