const express = require("express");
const path = require("path");
const sendEmail = require("./utils/sendEmail.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "src")));

app.get("/download-resume", (_, res) => {
  const filePath = path.join(__dirname, "src", "resume.pdf");
  res.download(filePath, "resume.pdf", (err) => {
    if (err) {
      if (!res.headersSent) {
        res
          .status(500)
          .send("An error occured while downloading resume. Please try again.");
      }
    }
  });
});

app.post("/get-in-touch", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (name && email && message) {
    try {
      await sendEmail({
        from: "Portfolio Site *Contact Form Submission*",
        to: "contact@sebthedeveloper.com",
        subject: "Portfolio Site *Contact Form Submission*",
        html: `
          <h1 style="font-family: 'Arial';font-size:18px;">New contact form from ${name},</h1>
          <p style="font-family: 'Arial';font-size:18px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a>
          </p>
          <p style="font-family: 'Arial';font-size:18px;"><strong>${name}'s message:</strong> 
          <br /> <br />${message}</p>
          <br />
        `,
      });
    } catch (error) {
      console.error(`Something went wrong sending email ${error}`);
      res.status(400).json({
        status: {
          ok: false,
        },
        message:
          "There was an error submitting the form. Please try sending another message.",
      });
    }
    res.status(200).json({ status: { ok: true }, name });
  } else {
    res.status(400).json({
      status: {
        ok: false,
      },
      message:
        "There was an error submitting the form. Please try sending another message.",
    });
  }
});

// Demo routes

app.get("/demos/brothers-moving-and-storage", (_, res) => {
  res.sendFile(
    path.join(__dirname, "src/demos/brothers-moving-and-storage/index.html")
  );
});

app.get("/demos/apocalypse-mega-mart", (_, res) => {
  res.sendFile(
    path.join(__dirname, "src/demos/apocalypse-mega-mart/apocalypse.html")
  );
});

app.get("/demos/off-load-moving", (_, res) => {
  res.sendFile(
    path.join(__dirname, "src/demos/off-load-moving/public/views/index.html")
  );
});

app.post("/demos/off-load-moving/mimic-send", (req, res) => {
  res.redirect("public/views/success.html");
});

app.get("/demos/cross-country-movers", (_, res) => {
  res.sendFile(
    path.join(__dirname, "src/demos/cross-country-movers/public/index.html")
  );
});

// Default
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(
    "Server for SebTheDeveloper.com started on http://localhost:" + port
  );
});
