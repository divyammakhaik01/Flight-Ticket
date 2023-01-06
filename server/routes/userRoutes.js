const express = require('express')
const router = express.Router();
const user  = require('../controller/user')

// all flights going from S -> D
router.post('/get_flights'  , user.get_flights )

// get specific flight
router.get('/get_flight_seats/:flight_id'  , user.get_flight_seats_by_id )

router.get('/get_booked_flights/'  , user.get_booked_flights )

router.post('/book_seat'  , user.book_seat)



module.exports = router