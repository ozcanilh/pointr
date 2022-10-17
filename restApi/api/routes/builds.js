const express = require('express')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let builds = [];

router.get('/', (req,res,next) => {
    res.send(builds);
});

router.post('/', (req,res,next) => {
    const build = req.body;
    const Id = uuidv4();
    const buildId = { ...build, id:Id };

    builds.push(buildId);
    res.send(`Build ${build.name} added!`);
});

router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    const foundBuilds = builds.find((build) => build.id == id);
    res.send(foundBuilds);
});

router.delete('/:id', (req,res,next) => {
    const id = req.params.id;
    builds = builds.filter((build) => build.id != id );
    res.send(`Level with the ${id} deleted!`);
});

module.exports = router;
