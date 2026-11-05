import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  requireAdmin,
} from "./controller.js";

const router = Router();

router.post("/", createAppointment);
router.get("/", requireAdmin, getAppointments);

export default router;