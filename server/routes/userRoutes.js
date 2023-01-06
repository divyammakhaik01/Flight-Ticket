const express = require('express')
const router = express.Router();
const user  = require('../controller/user')


router.get('/get_flights'  , user.get_flights )
router.get('/get_flight_seats/:id'  , user.get_flight_seats )
router.get('/get_booked_flights/'  , user.get_flight_seats )

router.post('/book_seat/:id'  , user.book_seat)


module.exports = router