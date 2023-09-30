function AreaCuadrado(Lado)
{
    return  Lado*Lado;
}

function AreaTringualo(Base, altura){
    return ((Base*altura)/2 ); 
}

module.exports.saludar = function() {
    console.log("Hola desde el módulo!");
}

// Exportamos una variable llamada 'numero'
module.exports.numero = 42;





module.exports.AreaCuadrado=AreaCuadrado;
module.exports.AreaTringualo=AreaTringualo;



// console.log(_dirname)
console.log(module);
// console.log(_filname)
