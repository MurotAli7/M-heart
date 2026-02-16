const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 📊 DATA saqlash
let values = [];
let bpm = 0;

// ❤️ BPM hisoblash funksiyasi
function calculateBPM(values) {
  if (values.length < 20) return 0;

  let threshold = 600; // signalga qarab o'zgartirasan
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

  // 5 sekundlik signalni 60 sekundga o'tkazish
  return peaks * 12;
}

// 🔍 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server ishlayapti 🚀");
});

// 📡 ESP yuboradi (POST)
app.post("/data", (req, res) => {
  try {
    const value = req.body.value;

    // tekshiruv
    if (typeof value !== "number") {
      return res.status(400).send("Invalid value");
    }

    // saqlash
    values.push(value);

    // max 200 ta qiymat
    if (values.length > 200) {
      values.shift();
    }

    // BPM hisoblash
    bpm = calculateBPM(values);

    console.log("Signal:", value, "| BPM:", bpm);

    res.send("OK");

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// 🌐 Frontend oladi (GET)
app.get("/data", (req, res) => {
  res.json({
    value: values[values.length - 1] || 0,
    bpm: bpm
  });
});

// 🚀 SERVER START
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
