const express = require('express');
const router = express.Router();



const {addSchedule, checkSchedule} = require('../controllers/Schedule')

router.route('/').post(addSchedule);
router.post('/check-schedule/:id', checkSchedule);




module.exports = router;



