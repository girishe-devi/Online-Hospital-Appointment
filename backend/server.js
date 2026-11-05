import express from "express";
import cors from "cors";
import appointmentRoutes from "./route.js";

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json({ limit: "10kb" }));

app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));