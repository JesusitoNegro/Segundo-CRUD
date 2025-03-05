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

    calcularPromedioPorEstudiante() {
        return this.estudiantes.map(est => ({
            nombre: est.nombre,
            promedio: est.calcularPromedio(),
            nivel: est.nivel
        }));
    }

    filtrarPorPromedio(umbral) {
        return this.calcularPromedioPorEstudiante().filter(est => est.promedio >= umbral);
    }

    aprobadosYReprobadosPorMateria(materia, umbral = 60) {
        return this.estudiantes.reduce((resultado, est) => {
            const calificacion = est.calificaciones[materia];
            if (calificacion !== undefined) {
                if (calificacion >= umbral) {
                    resultado.aprobados.push({ nombre: est.nombre, calificacion, nivel: est.nivel });
                } else {
                    resultado.reprobados.push({ nombre: est.nombre, calificacion, nivel: est.nivel });
                }
            }
            return resultado;
        }, { aprobados: [], reprobados: [] });
    }

    calcularPromedioGeneral() {
        const totalPromedios = this.estudiantes.reduce((acc, est) => acc + est.calcularPromedio(), 0);
        return this.estudiantes.length ? totalPromedios / this.estudiantes.length : 0;
    }

    calcularPromedioPorArea() {
        const promedios = this.estudiantes.reduce((acc, est) => {
            if (!acc[est.nivel]) {
                acc[est.nivel] = { total: 0, cantidad: 0 };
            }
            acc[est.nivel].total += est.calcularPromedio();
            acc[est.nivel].cantidad++;
            return acc;
        }, {});
        
        return Object.keys(promedios).reduce((res, area) => {
            res[area] = promedios[area].total / promedios[area].cantidad;
            return res;
        }, {});
    }

    distribucionPorArea() {
        return this.estudiantes.reduce((acc, est) => {
            acc[est.nivel] = (acc[est.nivel] || 0) + 1;
            return acc;
        }, {});
    }

    promedioMateriasPorArea() {
        const materiasPorArea = this.estudiantes.reduce((acc, est) => {
            if (!acc[est.nivel]) {
                acc[est.nivel] = {};
            }
            Object.keys(est.calificaciones).forEach(materia => {
                if (!acc[est.nivel][materia]) {
                    acc[est.nivel][materia] = { total: 0, cantidad: 0 };
                }
                acc[est.nivel][materia].total += est.calificaciones[materia];
                acc[est.nivel][materia].cantidad++;
            });
            return acc;
        }, {});
        
        return Object.keys(materiasPorArea).reduce((resultado, area) => {
            resultado[area] = Object.keys(materiasPorArea[area]).reduce((materiaRes, materia) => {
                materiaRes[materia] = materiasPorArea[area][materia].total / materiasPorArea[area][materia].cantidad;
                return materiaRes;
            }, {});
            return resultado;
        }, {});
    }
}

export default GestorEstudiantes;