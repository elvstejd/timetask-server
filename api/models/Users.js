const mongoose = require('mongoose');

const preferencesSchema = mongoose.Schema({
    // to do
});

const userSchema = mongoose.Schema({
    authId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    // preferences: preferencesSchema
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
