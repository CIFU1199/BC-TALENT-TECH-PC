// Imprimir mensaje de bienvenida
console.log("Hello, World!");

// Función para sumar dos números
const add = (a: number, b: number): number => {
    return a + b;
};

// Llamar a la función y almacenar el resultado
const result: number = add(7, 7);

// Imprimir el resultado en la consola
console.log(`El resultado de la suma es: ${result}`);

interface IPersona {
    name: string;
    lastname:string;
}

const saludar = (persona:IPersona)=> {
    console.log(`Hola ${persona.name} ${persona.lastname}`);
}
saludar({name:'Juan', lastname:'Pérez'});