const express = require('express')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let levels = [];

router.get('/', (req,res) => {
    res.send(levels);
});

router.post('/', (req,res) => {
    const level = req.body;
    const Id = uuidv4();
    const levelId = { ...level, id:Id };

    levels.push(levelId);
    res.send(`Level ${level.name} added!`);
});

router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    const foundLevel = levels.find((level) => level.id == id);
    res.send(foundLevel);
});

router.delete('/:id', (req,res,next) => {
    const id = req.params.id;
    levels = levels.filter((level) => level.id != id );
    res.send(`Level with the ${id} deleted!`);
});

module.exports = router;
