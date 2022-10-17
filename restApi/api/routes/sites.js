const express = require('express')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let sites = [];

router.get('/', (req,res,next) => {
    res.send(sites);
});

router.post('/', (req,res,next) => {
    const site = req.body;
    const Id = uuidv4();
    const siteId = { ...site, id:Id };

    sites.push(siteId);
    res.send(`Site ${site.name} added!`);
});

router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    const foundSites = sites.find((site) => site.id == id);
    res.send(foundSites);
});

router.delete('/:id', (req,res,next) => {
    const id = req.params.id;
    sites = sites.filter((site) => site.id != id );
    res.send(`Level with the ${id} deleted!`);
});

module.exports = router;
