const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, async (req, res) => {
    try {
        const response = await User.find();
        res.json(response);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const response = await User.findOne({ _id: req.params.id });
        res.json(response);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;