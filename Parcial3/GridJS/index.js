



new gridjs.Grid({
    columns: ['Nombres', 'ApellidoPaterno', 'ApellidoMaterno', 'Sexo', 'Edad', 'IngresosM', 'Carrera' ],
    server: {
      url: 'http://localhost:8082/alumnos',
      then: data => data.map(alumnos => 
        [alumnos.Nombres, alumnos.ApellidoPaterno, alumnos.ApellidoMaterno , alumnos.Sexo , alumnos.Edad , alumnos.IngresosM , alumnos.Carrera])
    } 
  }).render(document.getElementById("wrapper")); 