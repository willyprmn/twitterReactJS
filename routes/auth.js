const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
    try {
        const getUser = await User.findOne({ username: req.body.username });
        if (!getUser) return res.send('Username not found !');

        const cekPassword = await bcrypt.compare(req.body.password, getUser.password);
        if (!cekPassword) return res.send('Password not found !');

        const token = jwt.sign({ id: getUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.header('Authorization', `Bearer ${token}`).json({ token });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });

        const response = await newUser.save();
        res.json(response);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;