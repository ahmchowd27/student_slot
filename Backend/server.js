const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (using provided URI)
mongoose
  .connect(
    "mongodb+srv://mardia:Lum!a640@cluster0.xcvb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schemas and Models
const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true, match: /^\d{8}$/ },
  firstName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  lastName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  projectTitle: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phoneNumber: { type: String, required: true, match: /^\d{3}-\d{3}-\d{4}$/ },
  timeSlot: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot" },
});

const timeSlotSchema = new mongoose.Schema({
  slotNumber: { type: Number, required: true, unique: true },
  date: String,
  time: String,
  remainingSeats: { type: Number, default: 6 },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);
const Student = mongoose.model("Student", studentSchema);

// Routes

// 1. Get all time slots
app.get("/api/timeslots", async (req, res) => {
  try {
    const timeSlots = await TimeSlot.find().populate(
      "students",
      "firstName lastName"
    );
    res.json(
      timeSlots.map((slot) => ({
        slotNumber: slot.slotNumber,
        date: slot.date,
        time: slot.time,
        remainingSeats: slot.remainingSeats,
        students: slot.students,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Error fetching time slots" });
  }
});

// 2. Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().populate(
      "timeSlot",
      "slotNumber date time"
    );
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching students" });
  }
});

// 3. Register or update a student
app.post("/api/register", async (req, res) => {
  const {
    studentId,
    firstName,
    lastName,
    projectTitle,
    email,
    phoneNumber,
    slotNumber,
  } = req.body;

  console.log("Incoming payload:", req.body); // Log payload for debugging

  try {
    const timeSlot = await TimeSlot.findOne({ slotNumber });
    if (!timeSlot || timeSlot.remainingSeats <= 0) {
      return res
        .status(400)
        .json({ error: "Selected time slot is not available" });
    }

    let student = await Student.findOne({ studentId });

    if (student) {
      // Ensure student ID is not reused
      return res.status(400).json({
        error: `Student with ID ${studentId} is already registered.`,
      });
    }

    student = new Student({
      studentId,
      firstName,
      lastName,
      projectTitle,
      email,
      phoneNumber,
      timeSlot: timeSlot._id,
    });

    await student.save();

    timeSlot.students.push(student._id);
    timeSlot.remainingSeats -= 1;
    await timeSlot.save();

    res.json({ message: "Registration successful", student });
  } catch (err) {
    console.error("Error during registration:", err); // Log detailed error
    res.status(500).json({ error: "Error registering student" });
  }
});

// 4. Initialize time slots
app.post("/api/init-timeslots", async (req, res) => {
  const timeSlots = [
    {
      slotNumber: 1,
      date: "4/19/2070",
      time: "6:00 PM - 7:00 PM",
      remainingSeats: 6,
    },
    {
      slotNumber: 2,
      date: "4/19/2070",
      time: "7:00 PM - 8:00 PM",
      remainingSeats: 6,
    },
    {
      slotNumber: 3,
      date: "4/19/2070",
      time: "8:00 PM - 9:00 PM",
      remainingSeats: 6,
    },
    {
      slotNumber: 4,
      date: "4/20/2070",
      time: "6:00 PM - 7:00 PM",
      remainingSeats: 6,
    },
    {
      slotNumber: 5,
      date: "4/20/2070",
      time: "7:00 PM - 8:00 PM",
      remainingSeats: 6,
    },
    {
      slotNumber: 6,
      date: "4/20/2070",
      time: "8:00 PM - 9:00 PM",
      remainingSeats: 6,
    },
  ];

  try {
    await TimeSlot.deleteMany();
    const createdSlots = await TimeSlot.insertMany(timeSlots);
    res.json({ message: "Time slots initialized", createdSlots });
  } catch (err) {
    res.status(500).json({ error: "Error initializing time slots" });
  }
});

// 5. Remove a student and update the associated time slot
app.delete("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const timeSlot = await TimeSlot.findById(student.timeSlot);

    if (timeSlot) {
      timeSlot.students.pull(student._id);
      timeSlot.remainingSeats += 1;
      await timeSlot.save();
    }

    await student.deleteOne();

    res.json({ message: `Student ${studentId} removed successfully` });
  } catch (err) {
    res.status(500).json({ error: "Error removing student" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
