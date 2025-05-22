const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
app.use(cors());

let numberWindow = [];

const MOCK_NUMBERS = {
  p: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
  f: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
  e: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  r: [9, 12, 25, 7, 8, 11, 3, 10, 18, 27],
};

const simulateFetch = (type) => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 1000; 

    setTimeout(() => {
      if (delay > 5000){
        console.warn("Simulated fetch failed or timed out:", delay);
        reject(new Error("Timeout"));
      } else {
        const numbers = MOCK_NUMBERS[type] || [];
        const count = Math.floor(Math.random() * 10 + 1);
        const selected = numbers.slice(0, count);
        console.log(`Fetched ${type}:`, selected);
        resolve(selected);
      }
    }, delay);
  });
};

app.get("/numbers/:type", async (req, res) => {
  const { type } = req.params;

  if (!["p", "f", "e", "r"].includes(type)) {
    return res.status(400).json({ error: "Invalid type. Use p, f, e, or r." });
  }

  const prevState = [...numberWindow];
  let fetchedNumbers = [];

  try {
    fetchedNumbers = await simulateFetch(type);
  } catch (err) {
    return res.status(408).json({ error: "Simulated fetch timeout" });
  }

  const newUnique = fetchedNumbers.filter((n) => !numberWindow.includes(n));

  for (const num of newUnique) {
    if (numberWindow.length >= WINDOW_SIZE) numberWindow.shift();
    numberWindow.push(num);
  }

  const avg =
    numberWindow.length > 0
      ? parseFloat(
          (numberWindow.reduce((sum, n) => sum + n, 0) / numberWindow.length).toFixed(2)
        )
      : 0;

  res.json({
    windowPrevState: prevState,
    windowCurrState: numberWindow,
    numbers: newUnique,
    avg,
  });
});

app.listen(PORT, () => {
  console.log(` Mock API server running at http://localhost:${PORT}`);
});






// const express = require("express");-----------if we want to use token
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// const PORT = 9876;
// const WINDOW_SIZE = 10;

// app.use(cors());

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3ODkyNTEzLCJpYXQiOjE3NDc4OTIyMTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjIyNjVmMzgwLTg5OTUtNDJmYi1hOWRjLTdmZmU1ZjQ0ZWNhMSIsInN1YiI6IjIyMDAwMzMxMTdjc2VoQGdtYWlsLmNvbSJ9LCJlbWFpbCI6IjIyMDAwMzMxMTdjc2VoQGdtYWlsLmNvbSIsIm5hbWUiOiJnYW1wYSByaXNoaXRoYSIsInJvbGxObyI6IjIyMDAwMzMxMTciLCJhY2Nlc3NDb2RlIjoiYmVUSmpKIiwiY2xpZW50SUQiOiIyMjY1ZjM4MC04OTk1LTQyZmItYTlkYy03ZmZlNWY0NGVjYTEiLCJjbGllbnRTZWNyZXQiOiJac0p3a2ZSUmJ1V1J3Y1JmIn0.FuW5Rjn0s3lXqIVYJhUn0cOe57Fi-ezbAK6wy-SPWvk";

// const SOURCES = {
//   p: "http://20.244.56.144/evaluation-service/primes",
//   f: "http://20.244.56.144/evaluation-service/fibo",
//   e: "http://20.244.56.144/evaluation-service/even",
//   r: "http://20.244.56.144/evaluation-service/rand",
// };

// let numberWindow = [];

// app.get("/numbers/:type", async (req, res) => {
//   const { type } = req.params;
//   const url = SOURCES[type];

//   if (!url) {
//     return res.status(400).json({ error: "Invalid number type. Use p, f, e, or r." });
//   }

//   const prevState = [...numberWindow]; // Store the previous window state
//   let fetchedNumbers = [];

//   try {
//     // Fetch numbers from the third-party API
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//       },
//     });

//     fetchedNumbers = response.data.numbers || [];
//   } catch (err) {
//     console.error("API fetch error:", err.response?.status, err.response?.data || err.message);
//     return res.status(500).json({
//       error: "Failed to fetch numbers from external API",
//       details: err.message,
//     });
//   }

//   const newUnique = fetchedNumbers.filter((n) => !numberWindow.includes(n));

  
//   for (const num of newUnique) {
//     if (numberWindow.length >= WINDOW_SIZE) numberWindow.shift();
//     numberWindow.push(num);
//   }

//   const avg =
//     numberWindow.length > 0
//       ? parseFloat(
//           (numberWindow.reduce((sum, n) => sum + n, 0) / numberWindow.length).toFixed(2)
//         )
//       : 0;

//   res.json({
//     windowPrevState: prevState,
//     windowCurrState: numberWindow,
//     numbers: newUnique,
//     avg,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Backend running at http://localhost:${PORT}`);
// });
