const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    // userId: { type: String, required: false },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
    completionDate: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
