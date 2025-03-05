let studentId = 1;

class Estudiante {
    constructor(nombre, edad, nivel, calificaciones = {}) {
        this.id = studentId++;
        this.nombre = nombre;
        this.edad = edad;
        this.nivel = nivel;
        this.calificaciones = calificaciones; // Nuevo atributo
    }
}

export default Estudiante;
