import Estudiante from "./Estudiante.js";

class GestorEstudiantes {
    constructor() {
        this.estudiantes = [];
    }

    agregarEstudiante(nombre, edad, nivel, calificaciones = {}) {
        const nuevoEstudiante = new Estudiante(nombre, edad, nivel, calificaciones);
        this.estudiantes.push(nuevoEstudiante);
    }

    listarEstudiantes() {
        return this.estudiantes.map(est => ({
            id: est.id,
            nombre: est.nombre,
            edad: est.edad,
            nivel: est.nivel,
            calificaciones: est.calificaciones
        }));
    }

    buscarEstudiante(criterio) {
        return this.estudiantes.find(est => est.id === criterio || est.nombre.toLowerCase() === criterio.toLowerCase()) || "Estudiante no encontrado";
    }
}

export default GestorEstudiantes;
