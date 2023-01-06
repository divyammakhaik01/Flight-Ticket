const express = require('express')
const admin_auth_check = require('../middleware/auth_check')
const admin = require('../controller/admin')

const router = express.Router();


router.get('/get_all_flights' , admin_auth_check ,admin.get_flight_seats )
router.get('/get_booked_seats/:flightID' , admin_auth_check ,admin.get_booked_seats )
router.post('/add_flight' , admin_auth_check ,admin.post_data )
router.delete('/remove_flight' , admin_auth_check ,admin.remove_flight )



module.exports = router