import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";

import connectDB from "../config/database.js";

import Admin from "../models/Admin.js";

await connectDB();

const hashedPassword =
  await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );

const existing =
  await Admin.findOne({

    email:
      process.env.ADMIN_EMAIL

  });

if (existing) {

  console.log(
    "Admin already exists"
  );

  process.exit();
}

await Admin.create({

  username:
    process.env.ADMIN_NAME,

  email:
    process.env.ADMIN_EMAIL,

  passwordHash:
    hashedPassword

});

console.log(
  "Admin Created"
);

process.exit();