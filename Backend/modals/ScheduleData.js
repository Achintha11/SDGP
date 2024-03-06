const mongoose = require("mongoose");

const ScheduleDataSchema = new mongoose.Schema({
    date: Date,
    sleepStart: Date,
    sleepEnd: Date,
    workStart: Date,
    workEnd: Date
});



module.exports = mongoose.model("ScheduleData", ScheduleDataSchema);
