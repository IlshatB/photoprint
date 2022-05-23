const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const keys = require("./config/keys");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/goods/", require("./routes/goods"));
app.use("/api/cart/", require("./routes/cart"));
app.use("/api/orders/", require("./routes/orders"));
app.use("/api/comments/", require("./routes/comments"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

mongoose
  .connect(keys.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))
  );
