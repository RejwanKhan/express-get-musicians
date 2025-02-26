const { Router } = require("express");
const router = Router();
const { Musician } = require("../Musician");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const AllMusicians = await Musician.findAll();
  res.json(AllMusicians);
});

router.get("/:id", async (req, res) => {
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

// router.post("/", async (req, res) => {
//   const f = req.body;
//   console.log(req.body);
//   await Musician.create(req.body);

//   res.send("Muscian has been created");
// });

router.post(
  "/",
  [
    check("name").trim().not().isEmpty().isLength({ min: 2, max: 20 }),
    check("instrument").trim().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).send({ errors: errors.array() });
    } else {
      await Musician.create(req.body);
      res.status(201).send("Musician has been created");
    }
  }
);

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const musician = await Musician.findByPk(id);
  const { name, instrument } = req.body;
  if (name && instrument) {
    await musician.update({ name: name, instrument: instrument });
  } else if (name) {
    await musician.update({ name: name });
  } else if (instrument) {
    await musician.update({ instrument: instrument });
  }
  res.send("Updated Musician Sucessfully");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Musician.destroy({ where: { id: id } });
  res.send("Deleted Musician");
});

module.exports = router;
