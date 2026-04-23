const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Contact API
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({ success: true, message: "Email Sent Successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to Send Email" });
  }
});

// ✅ IMPORTANT FIX FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});