const mongoose = require('mongoose')

const flight_schema = mongoose.Schema({
    flight_id : {
        type : String , 
        require : true 
    } ,
    isActive : {
        type : Boolean , 
        require : true
    } , 
    bookedSeats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "booked_flight"
    }],
    from: {type :String},
    to: {type :String},
    fromTime: {type :Date},
    toTime: {type :Date},
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    price : {
        type : Number ,
        require : true
    } , 
    bookedSeatsNumber : [
        {
            type : Number , 
        }
    ]
})


module.exports = mongoose.model('Fight' , flight_schema)