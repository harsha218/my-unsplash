const mongoose = require('mongoose');
const { Schema } = mongoose;

const UnSplashSchema = new Schema({
    label: { type: String, required: true },
    url: { type: String, required: true },
    ip: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
})

const UnSplash = mongoose.model('UnSplash', UnSplashSchema);

module.exports = UnSplash;