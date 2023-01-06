const express = require('express')
const admin_auth_check = require('../middleware/auth_check')
const admin = require('../controller/admin')

const router = express.Router();


// router.get('/get_all_flights' , admin_auth_check ,admin.get_all_url )
router.post('/add_flight' , admin_auth_check ,admin.post_data )
// router.delete('/remove_flight' , admin_auth_check ,admin.post_data )
// router.patch('/activate_flight/:url' , admin_auth_check ,admin.activate_flight)
// router.patch('/deactivate_flight/:url' , admin_auth_check ,admin.deactivate_flight)


module.exports = router