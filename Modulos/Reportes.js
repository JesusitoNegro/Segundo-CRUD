import GestorEstudiantes from "./GestorEstudiantes.js";

class Reportes {
    constructor(gestorEstudiantes) {
        this.gestor = gestorEstudiantes;
    }

    // ✅ Muestra el promedio de cada estudiante en formato tabla
    calcularPromedioPorEstudiante() {
        const estudiantes = this.gestor.estudiantes.map(est => {
            const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
            const promedio = (Matematicas + Naturales + Sociales + Espanol) / 4;

            return {
                Nombre: est.nombre,
                Promedio: parseFloat(promedio.toFixed(2)), // Redondear a 2 decimales
                Área: est.area
            };
        });

        console.table(estudiantes);
    }

    // ✅ Filtra estudiantes con un promedio mayor o igual al umbral
    filtrarPorPromedio(umbral) {
        const filtrados = this.gestor.estudiantes
            .map(est => {
                const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
                const promedio = (Matematicas + Naturales + Sociales + Espanol) / 4;
                return {
                    Nombre: est.nombre,
                    Promedio: parseFloat(promedio.toFixed(2)),
                    Área: est.area
                };
            })
            .filter(est => est.Promedio >= umbral);

        console.table(filtrados);
    }

    // ✅ Obtiene aprobados y reprobados en una materia específica
    aprobadosYReprobadosPorMateria(materia, umbral = 60) {
        const resultado = this.gestor.estudiantes.reduce((res, est) => {
            const calificacion = est.calificaciones[materia];
            if (calificacion !== undefined) {
                if (calificacion >= umbral) {
                    res.aprobados.push({ Nombre: est.nombre, Calificación: calificacion, Área: est.area });
                } else {
                    res.reprobados.push({ Nombre: est.nombre, Calificación: calificacion, Área: est.area });
                }
            }
            return res;
        }, { aprobados: [], reprobados: [] });

        console.log(`\n📌 Aprobados en ${materia}:`);
        console.table(resultado.aprobados);
        console.log(`📌 Reprobados en ${materia}:`);
        console.table(resultado.reprobados);
    }

    // ✅ Calcula el promedio general del grupo y lo muestra en tabla
    calcularPromedioGeneral() {
        const estudiantes = this.gestor.estudiantes;
        const totalPromedios = estudiantes.reduce((acc, est) => {
            const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
            return acc + (Matematicas + Naturales + Sociales + Espanol) / 4;
        }, 0);

        const promedioGeneral = estudiantes.length ? parseFloat((totalPromedios / estudiantes.length).toFixed(2)) : 0;
        console.table([{ "Promedio General del Grupo": promedioGeneral }]);
    }

    // ✅ Encuentra los 2 mejores y 2 peores estudiantes
    mejoresYPeoresEstudiantes() {
        const estudiantesProcesados = this.gestor.estudiantes
            .map(est => {
                const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
                const promedio = (Matematicas + Naturales + Sociales + Espanol) / 4;
                return {
                    Nombre: est.nombre,
                    Promedio: parseFloat(promedio.toFixed(2)),
                    Área: est.area
                };
            });
    
        // ✅ Filtrar mejores (>= 85) y peores (< 70)
        const mejores = estudiantesProcesados.filter(est => est.Promedio >= 85);
        const peores = estudiantesProcesados.filter(est => est.Promedio < 70);
    
        console.log("\n📌 Mejores estudiantes (>= 85):");
        console.table(mejores);
        console.log("\n📌 Peores estudiantes (< 70):");
        console.table(peores);
    }

    // ✅ Ordena los estudiantes en un ranking según su promedio
    rankingEstudiantes() {
        const ranking = this.gestor.estudiantes
            .map(est => {
                const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
                const promedio = (Matematicas + Naturales + Sociales + Espanol) / 4;
                return {
                    Nombre: est.nombre,
                    Promedio: parseFloat(promedio.toFixed(2)),
                    Área: est.area
                };
            })
            .sort((a, b) => b.Promedio - a.Promedio);

        console.log("\n📌 Ranking de Estudiantes:");
        console.table(ranking);
    }

    // ✅ Cuenta la cantidad de aprobados y reprobados en el grupo
    cantidadAprobadosReprobados(umbral = 60) {
        const resultado = this.gestor.estudiantes.reduce((res, est) => {
            const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
            const promedio = (Matematicas + Naturales + Sociales + Espanol) / 4;
            promedio >= umbral ? res.aprobados++ : res.reprobados++;
            return res;
        }, { aprobados: 0, reprobados: 0 });

        console.table([resultado]);
    }

    promedioPorArea() {
        const promediosPorArea = this.gestor.estudiantes.reduce((areas, est) => {
            const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
            const promedio = (Matematicas + Naturales + Sociales + Espanol) / 4;
    
            if (!areas[est.area]) {
                areas[est.area] = { totalPromedio: 0, cantidad: 0 };
            }
    
            areas[est.area].totalPromedio += promedio;
            areas[est.area].cantidad++;
    
            return areas;
        }, {});
    
        // Calcular el promedio final por área
        const resultado = Object.keys(promediosPorArea).map(area => ({
            Área: area,
            "Promedio General": parseFloat((promediosPorArea[area].totalPromedio / promediosPorArea[area].cantidad).toFixed(2))
        }));
    
        console.log("\n📌 Promedio General por Área de Estudio:");
        console.table(resultado);
    }
    

    // ✅ Genera un informe general del rendimiento académico
    reporteRendimientoAcademico() {
        const totalEstudiantes = this.gestor.estudiantes.length;
        const promedioGeneralGrupo = this.gestor.estudiantes
            .reduce((acc, est) => {
                const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
                return acc + (Matematicas + Naturales + Sociales + Espanol) / 4;
            }, 0) / totalEstudiantes;

        const mejoresEstudiantes = this.gestor.estudiantes
            .map(est => {
                const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
                const promedio = (Matematicas + Naturales + Sociales + Espanol) / 4;
                return {
                    Nombre: est.nombre,
                    Promedio: parseFloat(promedio.toFixed(2)),
                    Área: est.area
                };
            })
            .filter(est => est.Promedio >= 85);

        const peoresEstudiantes = this.gestor.estudiantes
            .map(est => {
                const { Matematicas, Naturales, Sociales, Espanol } = est.calificaciones;
                const promedio = (Matematicas + Naturales + Sociales + Espanol) / 4;
                return {
                    Nombre: est.nombre,
                    Promedio: parseFloat(promedio.toFixed(2)),
                    Área: est.area
                };
            })
            .filter(est => est.Promedio < 60);

        console.log("\n📌 Reporte de Rendimiento Académico:");
        console.table([{ "Total de Estudiantes": totalEstudiantes, "Promedio General del Grupo": parseFloat(promedioGeneralGrupo.toFixed(2)) }]);
        console.log("\n📌 Mejores Estudiantes:");
        console.table(mejoresEstudiantes);
        console.log("\n📌 Peores Estudiantes:");
        console.table(peoresEstudiantes);
    }
}

export default Reportes;
