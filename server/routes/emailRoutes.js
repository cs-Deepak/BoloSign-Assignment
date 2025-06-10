const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/send-email", upload.single("file"), async (req, res) => {
  const { email } = req.body;
  const file = req.file;

  if (!email || !file) {
    return res.status(400).json({ message: "Email and file are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"BoloSign App" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Here is your signed document",
      text: "Please find the signed document attached.",
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer,
        },
      ],
    });

    res.json({ message: "Email sent successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email failed to send." });
  }
});

module.exports = router;
