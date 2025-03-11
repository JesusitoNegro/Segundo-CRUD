let studentId = 1;

class Estudiante {
    constructor(nombre, edad, area, calificaciones = {}) {
        this.id = studentId++;
        this.nombre = nombre;
        this.edad = edad;
        this.area = area;
        this.calificaciones = calificaciones;
    }

    calcularPromedio() {
        const valores = Object.values(this.calificaciones);
        return valores.length ? valores.reduce((acc, nota) => acc + nota, 0) / valores.length : 0;
    }
}

export default Estudiante;

