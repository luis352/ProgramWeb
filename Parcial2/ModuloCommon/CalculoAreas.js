
let areas=require(
    "./Areas.js"
);


let cowsay = require("cowsay");


let a=areas.AreaCuadrado(4)

let b=areas.AreaTringualo(4 , 10)

let variableobjeto = require("./Areas.js");

// Llamamos a la función 'saludar' del módulo
variableobjeto.saludar();



console.log(a, b  );

// Accedemos a la variable 'numero' del módulo
console.log("El número es: " + variableobjeto.numero);



console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}));




// console.log(cowsay);
