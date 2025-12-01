const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let eventTime = null; // event time store (database না থাকলে memory তে)

// Save event time
app.post("/set-event", (req, res) => {
  const { time } = req.body;

  if (!time) {
    return res.status(400).json({ message: "Event time is required" });
  }

  eventTime = new Date(time).getTime();
  res.json({ message: "Event time saved successfully" });
});

// Get countdown
app.get("/countdown", (req, res) => {
  if (!eventTime) {
    return res.json({ message: "No event time set" });
  }

  const now = new Date().getTime();
  const distance = eventTime - now;

  if (distance <= 0) {
    return res.json({ message: "Event Started!" });
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  res.json({
    days,
    hours,
    minutes,
    seconds,
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
