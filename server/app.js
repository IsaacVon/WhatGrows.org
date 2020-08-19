const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});


app.get('/api/:user', (req,res) => {
  res.send(req.params)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
