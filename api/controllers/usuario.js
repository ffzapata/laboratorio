'use strict'
const Usuario = require('../models/Usuario')

function getUsuarios(req,res){
     Usuario.find({},(err,usuario)=>{
    if(err) return res.status(500).send({message:'Error al realizar la peticion'})
    if(!usuario) return res.status(404).send({message:'El usuario no existe'})
    
    res.status(200).send({usuario})
        
    })
    
}
function saveUsuario(req,res){
    
    console.log('POST /api/usuario')
    console.log(req.body)
    
    let usuario=new Usuario()
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
    
}

module.export = {

getUsuarios,
saveUsuario

}