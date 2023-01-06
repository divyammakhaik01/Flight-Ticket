const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    name : {
        type : String , 
        require : true 
    } , 
    email : {
        type : String , 
        require : true,
        unique : true
    } , 
    password : {
        type : String , 
        require : true
    } , 
    isAdmin : {
        type : Boolean , 
        require : true
    } , 
    flights: [
        { type: mongoose.Schema.ObjectId, ref: "flight" }
    ],
    flights_booked : [
        { type: mongoose.Schema.ObjectId, ref: "flight" }
    ]
})



module.exports = mongoose.model('User' , user_schema)