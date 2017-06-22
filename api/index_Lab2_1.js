'use strict'
const espress = require('express')
const app= espress()

const port= process.env.PORT || 3001

app.get('/', function (req, res) {
  res.send('GET -> Bienvenido !');
});

// PUT 
app.put('/', function (req, res) {
  res.send('PUT -> Solicitud a la página principal');
});
// POST 
app.post('/', function (req, res) {
  res.send('POST -> Solicitud a la página principal');
});
// DELETE 
app.delete('/', function (req, res) {
  res.send('DELETE -> Solicitud a la página principal');
});

app.listen(port, () => {
    console.log(`API RESTful corriendo en http://localhost:${port}/`)
})

