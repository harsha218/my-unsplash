const requestIp = require('request-ip');
const fetch = require('node-fetch');
const UnSplash = require('../Models/UnSplash.js');

const getUnSplash = async (req, res, next) => {
    try {
        let objs = await UnSplash.find().sort({ "created_at": -1 });

        res.status(200);
        res.json(objs);

    } catch (error) {
        res.status(400);
        return next(error);
    }
}

const validate = (url) => {
    return fetch(url).then(res => {
        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    }).catch(_ => {
        return false;
    })
}

const addUnSplash = async (req, res, next) => {
    try {
        const { label, url } = req.body;
        const ip = requestIp.getClientIp(req);

        const isValid = await validate(url);
        console.log(isValid);

        if (label == null || url == null || label.trim() === '' || url.trim() === '' || !isValid) {
            res.status(400);
            res.json({ error: 'Invalid Parameters' });
            return;
        }

        const obj = await UnSplash.create({
            label,
            url,
            ip,
        })

        console.log(obj);
        res.status(200);
        res.json({ msg: 'Your UnSplash was added Successfully' });

    } catch (error) {
        res.status(400);
        return next(error);
    }
}

const deleteUnSplash = async (req, res, next) => {
    try {
        const id = req.params.id;

        const op = await UnSplash.deleteOne({ _id: id });

        if(op.n) {
            res.status(200);
            res.json({ msg: 'Your UnSplash was deleted Successfully' });
        } else {
            res.status(400);
            res.json({ msg: 'No Content Found' });
        }

    } catch (error) {
        res.status(400);
        return next(error);
    }
}

module.exports = {
    getUnSplash,
    addUnSplash,
    deleteUnSplash
}