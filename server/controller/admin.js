const Questions = require("../models/questions");
const Flight = require("../models/flight");
const User = require("../models/user");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");


const post_data = async(req,res) =>{

    try {

        
        

    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
    
}

// const get_flight_seats = async(req,res) =>{

//     try {



        

//     } catch (error) {
//         return res.json({
//             "status" : "false",
//             "message" : error
//         })
//     }
    
    
// }
// const get_booked_flights = async(req,res) =>{

//     try {

//     } catch (error) {
//         return res.json({
//             "status" : "false",
//             "message" : error
//         })
//     }
    
    
// }


// const book_seat = async(req,res) =>{

//     try {

//     } catch (error) {
//         return res.json({
//             "status" : "false",
//             "message" : error
//         })
//     }
    
    
// }



module.exports = {
    post_data ,
    // get_flight_seats,
    // get_booked_flights,
    // book_seat
}