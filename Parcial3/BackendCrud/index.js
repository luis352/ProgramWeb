const express = require('express');
const app = express();
const cors = require('cors');
const exceljs = require('exceljs');
var mysql = require('mysql2');

app.use(express.json());
app.use(cors());




app.get('/alumnos', (req, res) => {
  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Chispa10192',
    database: 'web'
  });

  connection.connect();

  connection.query('SELECT * from alumnos', function (error, results, fields) {
    if (error) {
      res.json(error);
    } else {
      if (results.length == 0) {
        res.json({ Mensaje: "Alumno no encontrado" });
      } else {
        // Generar el archivo Excel
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Alumnos');
        
        // Asumiendo que los resultados son un array de objetos
        const headers = Object.keys(results[0]);
        worksheet.addRow(headers);

        results.forEach(row => {
          const values = Object.values(row);
          worksheet.addRow(values);
        });

        // Enviar el archivo Excel como respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=alumnos.xlsx');

        workbook.xlsx.write(res)
          .then(() => {
            res.end();
          })
          .catch(err => {
            res.json({ error: 'Error al escribir el archivo Excel' });
          });
      }
    }
  });

  connection.end();
});







app.get('/alumnos/:idNumeroControl', (req, res) => {
  console.log(req.params.idNumeroControl);
  if (typeof req.params.idNumeroControl === 'undefined') {
    res.json({
      estado: 0,
      resultado: "Debe de enviar el paremtro idNumeroControl en la cadena de consulta"
    });
  } else {
    var connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'Chispa10192',
      database: 'web'
    });

    connection.connect();

    connection.query(`SELECT * from alumnos where idNumeroControl = ${req.params.idNumeroControl}`, function (error, results, fields) {
      if (error) {
        res.json({ estado: 0, resultado: error.sqlMessage });
      } else {
        if (results.length == 0) {
          res.json({ estado: 0, resultado: "Alumno no encontrado" });
        } else {
          res.json({ estado: 1, resultado: results[0] });
        }
      }
    });

    connection.end();
  }
});








app.delete('/alumnos/:idNumeroControl', (req, res) => {
      if (typeof(req.params.idNumeroControl) === 'undefined') {
        res.json({ estado:0,
        resultado: "Debe enviar el ID del género" });
    } else {
        const connection = mysql.createConnection({
          host: '127.0.0.1',
          user: 'root',
          password: 'Chispa10192',
          database: 'web'
        });

        connection.connect();
      
  connection.query(`DELETE FROM alumnos WHERE idNumeroControl = ${req.params.idNumeroControl}`, function (error, results, fields) {
    if (error) {
      res.json({ estado: 0, resultado: error.sqlMessage });
    } else {
      if (results.affectedRows == 1) {
        res.json({ estado: 1, resultado: "Alumno Eliminado" });
      } else {
        res.json({ estado: 0, resultado: "Ocurrio un error en la eliminacion" });
      }
    }
  });

  connection.end();
}
});

app.post('/alumnos', (req, res) => {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Chispa10192',
    database: 'web'
  });

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



app.put('/alumnos/:idNumeroControl', (req, res) => {

  let sentenciaSQL = "UPDATE alumnos SET " +
      "Nombres='" + req.body.Nombres + "'," +
      "ApellidoPaterno='" + req.body.ApellidoPaterno + "'," +
      "ApellidoMaterno='" + req.body.ApellidoMaterno + "'," +
      "Sexo='" + req.body.Sexo + "'," +
      "Edad='" + req.body.Edad + "'," +
      "IngresosM='" + req.body.IngresosM + "'," +
      "Carrera='" + req.body.Carrera + "'" +
      "WHERE IdNumeroControl=" + req.params.idNumeroControl;

  const connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'Chispa10192',
      database: 'web'
  });

  console.log(sentenciaSQL);

  connection.connect();
  connection.query(sentenciaSQL, function (error, results, fields) {
      if (error) {
          res.json({ estado: 0, resultado: error }); // Enviar solo una respuesta en caso de error
      } else {
          console.log(results);

          if (results.affectedRows == 1) {
              res.json({ estado: 1, resultado: 'Cliente Modificado' });
          } else {
              res.json({ estado: 1, resultado: "Ocurrió un error" });
          }
      }

      connection.end(); // Mover el cierre de la conexión aquí para asegurarse de que siempre se cierre
  });
});










app.post('/usuarios', (req, res) => {
  console.log(req.body.numero);
  res.send('Servidor Express contestando a peticion');
});

app.listen(8082, () => {
  console.log('Servidor Express Escuchando');
});
