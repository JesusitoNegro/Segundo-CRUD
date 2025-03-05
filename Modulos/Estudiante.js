let studentId = 1;

class Estudiante {
    constructor(nombre, edad, nivel, calificaciones = {}) {
        this.id = studentId++;
        this.nombre = nombre;
        this.edad = edad;
        this.nivel = nivel;
        this.calificaciones = calificaciones;
    }

    calcularPromedio() {
        const valores = Object.values(this.calificaciones);
        return valores.length ? valores.reduce((acc, nota) => acc + nota, 0) / valores.length : 0;
    }
}

export default Estudiante;