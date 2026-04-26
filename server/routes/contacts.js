import { Router } from "express";
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  addInteraction,
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
router.post("/:id/interactions", addInteraction);

export default router;
