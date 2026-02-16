const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let values = [];
let bpm = 0;

// ❤️ BPM hisoblash
function calculateBPM(values) {
  if (values.length < 20) return 0;

  let threshold = 600;
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

  return peaks * 12;
}

// 📡 ESP yuboradi
app.post("/data", (req, res) => {
  const value = req.body.value;

  values.push(value);
  if (values.length > 200) values.shift();

  bpm = calculateBPM(values);

  res.send("OK");
});

// 🌐 FRONTEND oladi
app.get("/data", (req, res) => {
  res.json({
    value: values[values.length - 1] || 0,
    bpm,
  });
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
