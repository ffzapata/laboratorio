'use strict'
const espress = require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')

const Usuario = require('./models/Usuario')

const app= espress()

const port= process.env.PORT || 3001

app.use(bodyParser.urlencoded({extends: false }))
app.use(bodyParser.json())
// Rutas
app.get('/usuario',(req,res) => {
// Listar Todos Usuarios
    Usuario.find({},(err,Usuario)=>{
    if(err) return res.status(500).send({message:'Error al realizar la peticion'})
    if(!Usuario) return res.status(404).send({message:'El Usuario no existe'})
    
    res.status(200).send({Usuario})
        
    })
})
app.get('/usuario/:idusuario',(req,res) => {
//Listar un Usuario Especifico
    
     let idusuario =req.params.idusuario
    Usuario.findById(idusuario,(err,Usuario) => {
    if(err) return res.status(500).send({message:'Error al realizar la peticion'})
    if(!Usuario) return res.status(404).send({message:'El Usuario no existe'})
        
    res.status(200).send({Usuario})
    })
})
app.post('/usuario',(req,res) => {
    console.log(req.body);
 let usuario=new Usuario();
    var params = req.body;
    
    usuario.nombre=params.nombre
    usuario.usuario=params.usuario
    usuario.email=params.email
    usuario.password=params.password
    usuario.rol='ROL_USUARIO'
    
    usuario.save((err,usuarioStored)=>{
        if(err) res.status(500).send({message:`Error al guardar en la Base de datos ${err}` })
        
        res.status(200).send({Usuario:usuarioStored})
    })
})
app.put('/usuario/:idusuario',(req,res) => {
    
    let idusuario =req.params.idusuario
    let update =req.body
    
    Usuario.findByIdAndUpdate(idusuario,update,(err,UsuarioUpdated)=>{
         if(err) res.status(500).send({message:'Error al Actualizar el Usuario'})
        
        res.status(200).send({Usuario:UsuarioUpdated})
    })
})
app.delete('/usuario/:idusuario',(req,res) => {
    
   let idusuario =req.params.idusuario
   
   Usuario.findById(idusuario,(err,Usuario) => {
    if(err) return res.status(500).send({message:'Error al eliminar el Usuario'})
       
       Usuario.remove(err =>{
           if(err) return res.status(500).send({message:'Error al eliminar el Usuario'})
           res.status(200).send({message:'El Usuario ha sido Borrado'})
       })
    })
})
    
mongoose.connect('mongodb://localhost:27017/telesup',(err,res)=>{
    if(err) {
   return console.log(`error al conectar la BD: ${err}`)    
    }
    console.log('conexion a la base de datos establecida')
    
app.listen(port, () => {
    console.log(`API RESTful corriendo en http://localhost:${port}/`)
    })
})