import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

export const loginAdmin =
async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const admin =
      await Admin.findOne({
        email
      });

    if (!admin) {

      return res
        .status(401)
        .json({

          success:false,

          message:
            "Invalid Credentials"

        });

    }

    const match =
      await bcrypt.compare(
        password,
        admin.passwordHash
      );

    if (!match) {

      return res
        .status(401)
        .json({

          success:false,

          message:
            "Invalid Credentials"

        });

    }

    const token =
      jwt.sign(

        {
          id:
            admin._id
        },

        process.env.JWT_SECRET,

        {
          expiresIn:"7d"
        }

      );

    res.json({

      success:true,

      token

    });

  } catch (error) {

    res.status(500).json({

      success:false,

      message:
        error.message

    });

  }

};