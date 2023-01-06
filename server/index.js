const express = require('express')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const db = require('./config/db')
const app = express() 

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/auth' , authRoutes)
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)



app.listen(`${PORT}` , (req,res)=>{
    console.log(`server is running at PORT ${PORT} `)
    db()
  
})



