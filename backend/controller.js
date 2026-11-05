import { create, getAll } from "./model.js";

function validate(body) {
  const { doctorId, doctorName, department, patient, date, timeSlot } = body ?? {};

  if (!doctorId || !doctorName || !department) return "Choose a doctor.";
  if (!patient || typeof patient.name !== "string" || patient.name.trim().length < 2) {
    return "Enter the patient's full name.";
  }
  if (!/^\d{10}$/.test(String(patient.phone ?? ""))) return "Enter a 10-digit mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(patient.email ?? ""))) {
    return "Enter a valid email address.";
  }
  if (!Number.isInteger(patient.age) || patient.age < 0 || patient.age > 120) {
    return "Enter an age between 0 and 120.";
  }
  if (!["Female", "Male", "Other"].includes(patient.gender)) return "Choose a gender.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date ?? ""))) return "Choose a date.";
  if (!timeSlot) return "Choose a time slot.";

  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  if (date < today) return "Choose today or a later date.";

  return null;
}

// POST /api/appointments
export function createAppointment(req, res) {
  const problem = validate(req.body);
  if (problem) return res.status(400).json({ message: problem });

  const { doctorId, doctorName, department, patient, date, timeSlot, reason } = req.body;

  try {
    const result = create({
      doctorId,
      doctorName,
      department,
      patient: {
        name: patient.name.trim(),
        phone: patient.phone,
        email: patient.email.trim(),
        age: patient.age,
        gender: patient.gender,
      },
      date,
      timeSlot,
      reason: typeof reason === "string" ? reason.trim().slice(0, 500) : "",
    });

    if (result.duplicate) {
      return res
        .status(409)
        .json({ message: "That time slot is already booked. Choose another." });
    }

    res.status(201).json({ id: result.appointment.id });
  } catch (err) {
    console.error("Booking failed:", err.name); // the error type only, never patient details
    res.status(500).json({ message: "Something went wrong on the server." });
  }
}

// GET /api/appointments (staff only)
export function getAppointments(req, res) {
  try {
    res.json(getAll());
  } catch (err) {
    console.error("Read failed:", err.name);
    res.status(500).json({ message: "Something went wrong on the server." });
  }
}

// Runs before getAppointments and checks the admin key.
export function requireAdmin(req, res, next) {
  if (!process.env.ADMIN_KEY || req.get("x-admin-key") !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: "Not allowed." });
  }
  next();
}