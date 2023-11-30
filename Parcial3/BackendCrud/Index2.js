// const express = require('express')
// const app = express()

// // const  mysql = requeire('mysql'); 

// var mysql = require('mysql2')


// app.use(express.json());

// app.get('/web', (req, res) =>  {

//     var connection = mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : 'Chispa10192',
//         database : 'web'
//       });


//     connection.connect();
 
//     connection.query(`SELECT * from futbolistas where Edad = $(req.query.Edad)` , function (error, results, fields) {
//     if (error) throw error;
//     // console.log('The solution is: ', results[0].solution);
      
//       results.json(results); 
//     });
    
//     connection.end();
    

//     //res.json({id:req.query.idNumeroControl});

// })

// app.post('/usuarios', (req, res) => {
// console.log(req.body.numero)    
// // req.body
// res.send('Servidor Express contestando a peticion')
// })


// app.listen(8082, () => {
//     console.log('ServidorExpress Escuchado')
// })