import {
  sendInquiryEmail
}
from "../utils/sendEmail.js";

import Inquiry from "../models/Inquiry.js";

export const createInquiry = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      message
    } = req.body;

    const inquiry =
      await Inquiry.create({

        inquiryId:
          "AUR-" + Date.now(),

        name,
        email,
        phone,
        eventType,
        eventDate,
        message

      });

    await sendInquiryEmail(
      inquiry
    );

    res.status(201).json({

      success: true,

      inquiry

    });

  } catch (error) {

    console.error(
      "EMAIL ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message
    });

}

};

export const getAllInquiries =
async (req, res) => {

  try {

    const inquiries =
      await Inquiry.find()
      .sort({
        createdAt: -1
      });

    res.json({

      success: true,

      inquiries

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

export const updateInquiryStatus =
async (req, res) => {

  try {

    const inquiry =
      await Inquiry.findByIdAndUpdate(

        req.params.id,

        {
          status:
            req.body.status
        },

        {
          new: true
        }

      );

    res.json({

      success: true,

      inquiry

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

export const deleteInquiry =
async (req, res) => {

  try {

    await Inquiry.findByIdAndDelete(
      req.params.id
    );

    res.json({

      success: true

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};