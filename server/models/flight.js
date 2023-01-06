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
    bookedSeats: [{type : Number }],
    from: {type :String},
    to: {type :String},
    fromTime: {type :String},
    toTime: {type :String},
    user : {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    price : {
        type : Number ,
        require : true
    }

})


module.exports = mongoose.model('Fight' , flight_schema)