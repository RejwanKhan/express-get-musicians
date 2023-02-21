const express = require("express");
const app = express();
const { Musician } = require("./Musician");
const { sequelize } = require("./db");

const port = 3000;

//TODO

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});

app.get("/musicians", async (req, res) => {
  const AllMusicians = await Musician.findAll();
  res.json(AllMusicians);
});

app.get("/musicians/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const musicians = await Musician.findByPk(id);
    if (!musicians) {
      throw new Error("Musicians not found");
    }
    res.send(musicians);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});
