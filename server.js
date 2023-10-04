const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "src")));

app.get("/download-resume", (req, res) => {
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
  console.log("Server for portfolio site started on port:", port);
});
