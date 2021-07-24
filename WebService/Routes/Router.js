const express = require('express');
const { getUnSplash, addUnSplash, deleteUnSplash } = require('../Controllers/Controller.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200);
    res.json({ msg: 'Hi there!!!' });
})

router.get('/getUnSplash', getUnSplash);

router.post('/addUnSplash', addUnSplash);

router.delete('/deleteUnSplash/:id', deleteUnSplash);

module.exports = router;