const router = require('express').Router();
const Twit = require('../models/Twit');

router.get('/', async (req, res) => {
    try {
        const response = await Twit.find();
        res.json(response);
    } catch (err) {
        res.status(400).send('invalid twit');
    }
});

router.post('/', async (req, res) => {
    const newTwit = new Twit(req.body);

    try {
        const response = await newTwit.save();
        res.json(response);
    } catch (err) {
        res.status(400).send('invalid liked');
    }
});

router.put('/like', async (req, res) => {
    const idTwit = req.body.idTwit;
    const idUser = req.body.idUser;

    try {
        const twit = await Twit.findById(idTweet);
        const response = await Twit.findOneAndUpdate(
            { _id: idTwit },
            {
                likes: [...twit.likes, id.body.idUser]
            }
        );
        res.send(`User with id ${idUser} like tweet with id ${idTwit}`);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/comment', async (req, res) => {
    const idTwit = req.body.idTwit;
    const idUser = req.body.idUser;
    const comment = req.body.comment;

    try {
        const twit = await Twit.findById(idTwit);
        const response = await Tweet.findOneAndUpdate(
            { _id: idTwit },
            {
                comments: [...twit.comments, { idUser, comment }]
            }
        );
        res.send(`User ${idUser} commented on tweet with id ${idTwit}`);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;