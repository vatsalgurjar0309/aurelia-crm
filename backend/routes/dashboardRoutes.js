import express from "express";

import Inquiry from "../models/Inquiry.js";

import authMiddleware
from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.get(
  "/stats",
  authMiddleware,
  async (req, res) => {

    const total =
      await Inquiry.countDocuments();

    const newCount =
      await Inquiry.countDocuments({
        status:"New"
      });

    const contacted =
      await Inquiry.countDocuments({
        status:"Contacted"
      });

    const confirmed =
      await Inquiry.countDocuments({
        status:"Confirmed"
      });

    res.json({

      total,

      newCount,

      contacted,

      confirmed

    });

  }
);

export default router;