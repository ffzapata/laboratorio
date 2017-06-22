'use strict'
const espress = require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')

const app= espress()

const port= process.env.PORT || 3001

mongoose.connect('mongodb://localhost:27017/telesup',(err,res)=>{
    if(err) {
   return console.log(`error al conectar la BD: ${err}`)    
    }
    console.log('conexion a la base de datos establecida')
    
app.listen(port, () => {
    console.log(`API RESTful corriendo en http://localhost:${port}/`)
    })
})