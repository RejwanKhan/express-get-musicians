const express = require("express");
const app = express();
const musicianRouter = require("./routes/Muscians");

const { sequelize } = require("./db");
app.use(express.json());
app.use("/musicians", musicianRouter);

const port = 3000;

//TODO

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
