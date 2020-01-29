const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, err => {
    if (err) return console.log(err);
    console.log("Connected to mongoDB");
});

// Routes
app.get('/', (req, res) => {
    res.send('Server is running on port 4000');
});
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/twit', require('./routes/twit'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));