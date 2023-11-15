// const express=require('express');
// const app=express('cors');
// const cors = require('cors')
// app.get('/',(req,res)=>{
//     res.json({mensaje:"Server express respondiendo a get"});
// });
 
// app.post('/',(req,res)=>{
//     res.json({mensaje:"Server express respondiendo a post"})
// })
// app.delete('/',(req,res)=>{
//     res.json({mensaje:"Server express respondiendo a delete"})
// })
// app.listen(8082,()=>{
//     console.log("Servidor express en puerto 8082")
// });


const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());  // Usa cors como middleware

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Chispa10192',
    database: 'web'
});

app.get('/alumnos', (req, res) => {
    console.log(req.query.idNumeroControl);

    let consulta = '';
    if (typeof (req.query.idNumeroControl) == 'undefined') {
        consulta = 'select * from alumnos';
    } else {
        consulta = `select * from alumnos where idNumeroControl = ${req.query.idNumeroControl}`;
    }
    console.log(consulta);

    connection.query(consulta, function (err, result, fields) {
        // Cambié 'error' por 'err' en la línea siguiente
        if (err) {
            res.json(err);
        } else {
            if (result.length == 0) {
                res.json({ Mensaje: "Alumno no encontrado" });
            } else {
                res.json(result)
            }
        }
    });
    // Eliminé 'connection.end();', ya que no es necesario cerrar la conexión después de una única consulta
});

const port = 8082;
app.listen(port, () => {
    console.log(`Servidor express en puerto ${port}`);
});






app.get('/alumnos', (req, res) => {
    res.json({ mensaje: "Server express respondiendo a get" });
});

app.post('/alumnos', (req, res) => {
    res.json({ mensaje: "Server express respondiendo a post" });
});

app.delete('/alumnos', (req, res) => {
    res.json({ mensaje: "Server express respondiendo a delete" });
});



