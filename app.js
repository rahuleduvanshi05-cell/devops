
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("My DevOps project is running!");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    app: "devops-project"
  });
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on ${PORT}`);
  });
}

module.exports = app;
