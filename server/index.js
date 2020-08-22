const mongoose = require("mongoose");
const users = require("./users");
const auth = require("./auth")
const express = require("express");
const app = express();

mongoose
  .set("useUnifiedTopology", true)
  .connect("mongodb://localhost/UrbanHomesteading", {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
