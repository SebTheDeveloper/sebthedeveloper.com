const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "src")));

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

app.get("*", (_, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => {
  console.log("Server for portfolio site started on port:", port);
});
