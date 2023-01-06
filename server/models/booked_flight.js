const mongoose = require('mongoose')

const booked_flight_schema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    seatNumber : [{
        type : Number , 
        require : true
    }]
})


module.exports = mongoose.model('booked_flight' , booked_flight_schema)