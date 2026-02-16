const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let values = []; // oxirgi signal
let bpm = 0;

// BPM hisoblash
function calculateBPM() {
  if (values.length < 10) return;

  let threshold = 600; // signalga qarab sozlanadi
  let peaks = 0;

  for (let i = 1; i < values.length - 1; i++) {
    if (
      values[i] > threshold &&
      values[i] > values[i - 1] &&
      values[i] > values[i + 1]
    ) {
      peaks++;
    }
  }

  // 5 sekundda nechta urish bo'lsa
  bpm = peaks * 12; // 5s * 12 = 60s
}

// ESP yuboradi
app.post("/data", (req, res) => {
  const value = req.body.value;

  values.push(value);

  if (values.length > 200) values.shift();

  calculateBPM();

  res.send("OK");
});

// Frontend oladi
app.get("/data", (req, res) => {
  res.json({
    value: values[values.length - 1] || 0,
    bpm,
  });
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
