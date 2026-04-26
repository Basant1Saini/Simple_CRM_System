import { Router } from "express";
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  getDashboard,
} from "../controllers/leadController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);

router.get("/dashboard", getDashboard);
router.route("/").get(getLeads).post(createLead);
router.route("/:id").get(getLead).put(updateLead).delete(deleteLead);

export default router;
