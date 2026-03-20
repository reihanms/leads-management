import { Request, Response } from "express";
import { leadService } from "../services/lead.service";
import { asyncHandler } from "../utils/async-handler";

/**
 * Lead controller — thin layer that delegates to LeadService.
 */
export const leadController = {
  /** POST /api/leads */
  createLead: asyncHandler(async (req: Request, res: Response) => {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({
      status: "success",
      message: "Lead created successfully",
      data: lead,
    });
  }),

  /** GET /api/leads */
  getAllLeads: asyncHandler(async (_req: Request, res: Response) => {
    const leads = await leadService.getAllLeads();
    res.status(200).json({
      status: "success",
      data: leads,
    });
  }),
};
