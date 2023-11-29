

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());  // Usa cors como middleware
app.use(express.json());

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
    connection.end(); 
});



const port = 8082;
app.listen(port, () => {
    console.log(`Servidor express en puerto ${port}`);
});

app.post('/alumnos', (req, res) => {
    

    
    let sentenciaSQL = "INSERT INTO alumnos VALUES (" + req.body.idNumeroControl + "," +
      "'" + req.body.Nombres + "'," +
      "'" + req.body.ApellidoPaterno + "'," +
      "'" + req.body.ApellidoMaterno + "'," +
      "'" + req.body.Sexo + "'," +
      "'" + req.body.Edad + "'," +
      "'" + req.body.IngresosM + "'," +
      "'" + req.body.Carrera + "'" + ")";
  
    console.log(sentenciaSQL);
  
    connection.connect();
    connection.query(sentenciaSQL, function (error, results, fields) {
      if (error) {
        res.json(error);
      } else {
        console.log(results);
        res.json(results);
      }
    });
  
    connection.end();
  });




app.delete('/alumnos', (req, res) => {
    res.json({ mensaje: "Server express respondiendo a delete" });
});



