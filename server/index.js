const config = require('config')
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth")
const express = require("express");
const app = express();
const cors = require('cors')
const uri = "mongodb+srv://admin:Ivh@1994@whatgrows.ketnq.gcp.mongodb.net/WhatGrowsTest?retryWrites=true&w=majority";


function App(req,res){



if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1);
}

mongoose
  .set("useUnifiedTopology", true)
  .set('useCreateIndex', true)
  .connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors())
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

}