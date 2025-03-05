import GestorEstudiantes from "./GestorEstudiantes.js";

class Reportes {
    constructor(gestorEstudiantes) {
        this.gestor = gestorEstudiantes;
    }

    calcularPromedioPorEstudiante() {
        return this.gestor.estudiantes.map(est => ({
            nombre: est.nombre,
            promedio: est.calcularPromedio(),
            nivel: est.nivel
        }));
    }

    filtrarPorPromedio(umbral) {
        return this.calcularPromedioPorEstudiante().filter(est => est.promedio >= umbral);
    }

    aprobadosYReprobadosPorMateria(materia, umbral = 60) {
        return this.gestor.estudiantes.reduce((resultado, est) => {
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
        const totalPromedios = this.gestor.estudiantes.reduce((acc, est) => acc + est.calcularPromedio(), 0);
        return this.gestor.estudiantes.length ? totalPromedios / this.gestor.estudiantes.length : 0;
    }

    mejoresYPeoresEstudiantes() {
        const estudiantesOrdenados = this.calcularPromedioPorEstudiante().sort((a, b) => b.promedio - a.promedio);
        return {
            mejores: estudiantesOrdenados.slice(0, 2),
            peores: estudiantesOrdenados.slice(-2)
        };
    }

    rankingEstudiantes() {
        return this.calcularPromedioPorEstudiante().sort((a, b) => b.promedio - a.promedio);
    }

    cantidadAprobadosReprobados(umbral = 60) {
        return this.gestor.estudiantes.reduce((resultado, est) => {
            const promedio = est.calcularPromedio();
            if (promedio >= umbral) {
                resultado.aprobados++;
            } else {
                resultado.reprobados++;
            }
            return resultado;
        }, { aprobados: 0, reprobados: 0 });
    }

    reporteRendimientoAcademico() {
        return {
            totalEstudiantes: this.gestor.estudiantes.length,
            promedioGeneralGrupo: this.calcularPromedioGeneral(),
            mejoresEstudiantes: this.filtrarPorPromedio(85),
            peoresEstudiantes: this.filtrarPorPromedio(60)
        };
    }
}

export default Reportes;