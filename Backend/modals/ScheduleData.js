const mongoose = require("mongoose");

const ScheduleDataSchema = new mongoose.Schema({
    uid : String,
    date: Date,
    sleepStart: Date,
    sleepEnd: Date,
    workStart: Date,
    workEnd: Date
});



module.exports = mongoose.model("ScheduleData", ScheduleDataSchema);
