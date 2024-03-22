const express = require('express');
const router = express.Router();



const {addSchedule} = require('../controllers/Schedule')

router.route('/').post(addSchedule);

module.exports = router;



