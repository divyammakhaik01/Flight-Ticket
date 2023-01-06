const Flight = require("../models/flight");
const User = require("../models/user");
const BookFlight = require('../models/booked_flight')

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const booked_flight = require("../models/booked_flight");


const get_flight_seats_by_id = async(req,res) =>{

    try {

        const {flight_id} = req.params ;
        console.log(">>>  " , flight_id)

        const flight_info = await Flight.findOne(
            {
                flight_id  : flight_id
            }
        )
        
        console.log("flight_info : " , flight_info)

        let booked_Seats = flight_info.bookedSeats;
        let booked_seats_array = []

        console.log(":: " , booked_Seats)
        let list_of_promise = booked_Seats.map(async(seats) => {
            return await booked_flight.findOne({_id : seats})
        });

        let resolved_promises = Promise.allSettled(list_of_promise).then((results)=>{
            for (let i = 0; i < results.length; i++) {
                if (results[i].status == "fulfilled" && results[i].value != null) {
                  booked_seats_array = [...booked_seats_array , ...results[i].value.seatNumber]
                  console.log("Resolved :: " + results[i].value);
                } else if (results[i].status == "rejected")
                  console.log("Rejected : " + results[i].reason);
              }      
        })

            console.log("-----------------   booked_Seats : " , booked_seats_array)

        resolved_promises.then((results)=>{
            console.log("booked_Seats : " , [...booked_seats_array])
            return res.json({
                "status" :"true" , 
                "message" : [...booked_seats_array]
            })
       })


     


    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
}

const get_flights = async(req,res) =>{

    try {

        let {source , dest , start_time , toTime} = req.body

        const results = await Flight.find(
            {
                fromTime: {
                        $gte: new Date(start_time), 
                        $lt: new Date(toTime)
                    }
            } 
          )

        return res.json({
            "status" : "true" , 
            "message" : results
        })
        

    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
    
}
const get_booked_flights = async(req,res) =>{

    try {
        const token = JSON.parse(req.header("token"));
        if (!token) {
            throw {
              status: "false",
              message: "token not found ",
            };
          }
        const check = jwt.verify(token, process.env.JWT_SECRET);

        const user_info = await User.findById(check.id)
        console.log(user_info)

        const all_promise = user_info.flights_booked.map(async(flight_id)=>{
            return await Flight.findById(flight_id)
        })
        
        let booked_flight = []

        const resolved_promises = Promise.allSettled(all_promise).then((results)=>{
            console.log("results  " , results)
            for (let i = 0; i < results.length; i++) {
                if (results[i].status == "fulfilled") {
                    booked_flight.push(results[i].value)
                  console.log("Resolved :: " + results[i].value);
                } else if (results[i].status == "rejected")
                  console.log("Rejected : " + results[i].reason);
              }
        })
        resolved_promises.then((results)=>{
            console.log("booked_flight : " , [...booked_flight])
            return res.json({
                "status" :"true" , 
                "message" : [...booked_flight]
            })
       })        




    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
    
}


const book_seat = async(req,res) =>{

    const token = JSON.parse(req.header("token"));

    console.log(req.body )

    try {

        let data = req.body ;

        let flight_id = data.flight_id ;
        let seat_ids = data.seat_ids ;
        if (!token) {
            throw {
              status: "false",
              message: "token not found ",
            };
          }

        console.log(flight_id ,"  " , seat_ids , "  " , seat_ids.length )

        if(flight_id == undefined || seat_ids.length === 0){
            return res.json({
                "status" :"false" , 
                "message" :"flight_id or seat_ids missing "
            })
        }
        // check if seats are already booked or not

        const check = await Flight.findOne({flight_id : flight_id});

        console.log("check " , check )


        // check if flight is full or not 
        
        if(check.bookedSeatsNumber.length === 60){
            return res.json({
                "status" :"false" ,
                "message" :"Flight full"
            })
        }

        seat_ids.forEach(seat => {
            console.log(" >> " , seat)
            console.log(check.bookedSeatsNumber.includes(seat))
            if(check.bookedSeatsNumber.includes(seat)){
                console.log("here")
                return res.json({
                    "status" :"false" , 
                    "message" :"Seat already booked "
                })

            }
        });

        // 
      
        const user_info = jwt.verify(token, process.env.JWT_SECRET);
        const current_user = await User.findOne({_id : user_info.id})
// updating update_booking 

        // check if user already booked flights
        console.log(">>- " , current_user._id)
        const check_booking = await BookFlight.findOne({user : current_user._id})
        console.log(check_booking)

        let booking ;
        
        if(check_booking != null){
             booking =await BookFlight.findByIdAndUpdate(check_booking._id , {
                seatNumber : [...check_booking.seatNumber , ...seat_ids]
            })
        }else{
             booking = await BookFlight.create({
                seatNumber : seat_ids , 
                user : user_info._id
            })
            console.log("update_booking : " , booking)
        }



// updating flight

        const curr_flight = await Flight.findOne({flight_id: flight_id})
        console.log("curr_flight : " , curr_flight)
        console.log("_id : " , curr_flight._id)
        console.log("_id : " , [...curr_flight.bookedSeatsNumber , seat_ids])
        console.log("_id : " , [...curr_flight.bookedSeats , booking])

        const update_flight = await Flight.findByIdAndUpdate(curr_flight._id , {
            bookedSeats : [...curr_flight.bookedSeats , booking] , 
            bookedSeatsNumber : [...curr_flight.bookedSeatsNumber , ...seat_ids]
        })

        console.log("update_flight : " , update_flight)

// updating user

        const update_user = await User.findByIdAndUpdate(current_user._id , {
            flights_booked : [...current_user.flights_booked , update_flight]
        })

        console.log("update_user : " , update_user)
                
        return res.json({
            "status" :"true" , 
            "message" : "flight booked successfully",
        })

    } catch (error) {
        return res.json({
            "status" : "false",
            "message" : error
        })
    }
    
    
}



module.exports = {
    get_flights ,
    get_booked_flights,
    get_flight_seats_by_id,
    book_seat
}