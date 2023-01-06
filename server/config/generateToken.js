require('dotenv').config();
const jwt = require('jsonwebtoken')

let secret = process.env.JWT_SECRET



const  generateToken = (id) =>{
    let token =  jwt.sign({id} , secret , {
        expiresIn : "10d"
    })
    return token
}

module.exports = generateToken
