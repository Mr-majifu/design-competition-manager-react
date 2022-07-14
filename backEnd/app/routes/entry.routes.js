const express = require('express');
const entryController = require("../controllers/entry.controller");

var router = express.Router();

router.get("/entries/", entryController.getAll);
router.post("/entries/", entryController.create);

router.get("/entry/:id/", entryController.getById);
router.put("/entry/:id/", entryController.updateById);
router.delete("/entry/:id/", entryController.deleteById);

module.exports = router;
