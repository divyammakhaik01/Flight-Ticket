const Flight = require("../models/flight");
const User = require("../models/user");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");


const post_data = async(req,res) =>{

    try {
        const {from , to , fromTime , toTime , user , price , date} = req.body ;


        const token = JSON.parse(req.header("token"));
        if (!token) {
          throw {
            status: "false",
            message: "token not found ",
          };
        }

        const flight_id = uuidv4();

        const result = jwt.verify(token, process.env.JWT_SECRET);
        let fromTime_date = new Date(fromTime)
        let toTime_date = new Date(toTime)

        let response_flight =  await Flight.create({
            flight_id : flight_id , 
            isActive : true ,
            from: from,
            to: to,
            fromTime: fromTime_date,
            toTime: toTime_date,
            user : result.id ,
            price : price 
          });                           
          

        console.log(response_flight)  

        return res.json({
            "result" : "true" , 
            "message" : response_flight
        })

    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
    
}
const get_flight_seats = async(req,res) =>{

    try {

        const token = JSON.parse(req.header("token"));
        if (!token) {
          throw {
            status: "false",
            message: "token not found ",
          };
        }

        const result = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = result.id ;
        const admin = await User.findOne({_id : user_id})

        const total_flights = await Flight.find({
            user : admin._id
        })

        console.log(total_flights)


        return res.json({
            "status" : "true" , 
            "message" : total_flights
        })
    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
    
}
const remove_flight = async(req,res) =>{

    try {

        const {flight_id} = req.body ;

        const remove_flight = await Flight.findOneAndRemove({flight_id : flight_id} , {new:true})

        if(!remove_flight){
            return res.json({
                "status" :"false" ,
                "message" : "flight not found "
            })
        }
        
        console.log(remove_flight)

        return res.json({
            "status" : "true" , 
            "message" : remove_flight
        })        
        

    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
    
}


const get_booked_seats = async(req,res) =>{

    try {

        const {flightID} = req.params ;

        const seats = await Flight.findOne({flight_id: flightID})

        console.log(seats)

        return res.json({
            "status" :"true" , 
            "message" :seats.bookedSeats
        })

    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
    
}



module.exports = {
    post_data ,
    get_flight_seats,
    remove_flight,
    get_booked_seats
}