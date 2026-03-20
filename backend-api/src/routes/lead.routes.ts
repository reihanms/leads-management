import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { createLeadSchema } from "../schemas/lead.schema";
import { leadController } from "../controllers/lead.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createLeadSchema),
  leadController.createLead
);

router.get("/", authenticate, leadController.getAllLeads);

export default router;
