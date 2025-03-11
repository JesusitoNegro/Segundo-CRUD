import readline from "readline";
import GestorEstudiantes from "./GestorEstudiantes.js";
import Reportes from "./Reportes.js";

const gestor = new GestorEstudiantes();
const reportes = new Reportes(gestor);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function agregarEstudiante() {
    rl.question("Nombre: ", nombre => {
        rl.question("Edad: ", edad => {
            rl.question("Área de estudio: ", area => {
                rl.question("Calificación en Matemáticas: ", matematicas => {
                    rl.question("Calificación en Naturales: ", naturales => {
                        rl.question("Calificación en Sociales: ", sociales => {
                            rl.question("Calificación en Español: ", espanol => {
                                const calificaciones = {
                                    Matematicas: parseFloat(matematicas),
                                    Naturales: parseFloat(naturales),
                                    Sociales: parseFloat(sociales),
                                    Espanol: parseFloat(espanol),
                                };

                                gestor.agregarEstudiante(nombre, parseInt(edad), area, calificaciones);
                                console.log("✅ Estudiante agregado correctamente.");
                                mostrarMenu();
                            });
                        });
                    });
                });
            });
        });
    });
}

function buscarEstudiante() {
    rl.question("Ingrese ID o nombre del estudiante: ", criterio => {
        const resultado = gestor.buscarEstudiante(isNaN(criterio) ? criterio : parseInt(criterio));
        console.log(resultado);
        mostrarMenu();
    });
}

function mostrarMenu() {
    console.log("\n--- Sistema CRUD de Estudiantes ---");
    console.log("1. Agregar estudiante");
    console.log("2. Listar estudiantes");
    console.log("3. Buscar estudiante");
    console.log("4. Generar reportes");
    console.log("5. Actualizar estudiante");
    console.log("6. Eliminar estudiante");
    console.log("7. Salir");

    rl.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            agregarEstudiante();
        } else if (opcion === "2") {
            console.table(gestor.listarEstudiantes());
            mostrarMenu();
        } else if (opcion === "3") {
            buscarEstudiante();
        } else if (opcion === "4") {
            mostrarMenuReportes();
        } else if (opcion === "5") {
            rl.question("Ingrese el ID del estudiante a actualizar: ", id => {
                gestor.actualizarEstudiante(parseInt(id), rl, mostrarMenu); });
            } else if (opcion === "6") {
                rl.question("Ingrese el ID del estudiante a eliminar: ", id => {
                    gestor.eliminarEstudiante(parseInt(id), mostrarMenu);});
        } else if (opcion === "7") {
            rl.close();
        } else {
            console.log("Opción no válida.");
            mostrarMenu();
        }
    });
}


function mostrarMenuReportes() {
    console.log("\n--- Reportes Académicos ---");
    console.log("1. Promedio de cada estudiante");
    console.log("2. Estudiantes con promedio mayor a un umbral");
    console.log("3. Aprobados y reprobados por materia");
    console.log("4. Promedio general del grupo");
    console.log("5. Mejores y peores estudiantes");
    console.log("6. Ranking de estudiantes");
    console.log("7. Cantidad de aprobados y reprobados");
    console.log("8. Reporte de rendimiento académico");
    console.log("9. Promedio por Área de Estudio");
    console.log("10. Filtrar estudiantes por Área de Estudio");
    console.log("11. Volver al menú principal");

  

    rl.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            reportes.calcularPromedioPorEstudiante();
            setTimeout(mostrarMenuReportes, 2000);
        } else if (opcion === "2") {
            rl.question("Ingrese el umbral: ", umbral => {
                reportes.filtrarPorPromedio(parseInt(umbral));
                setTimeout(mostrarMenuReportes, 2000);});
        } else if (opcion === "3") {
            rl.question("Ingrese la materia: ", materia => {
                reportes.aprobadosYReprobadosPorMateria(materia);
                setTimeout(mostrarMenuReportes, 2000);
            });
        } else if (opcion === "4") {
            reportes.calcularPromedioGeneral();
            setTimeout(mostrarMenuReportes, 2000);
        } else if (opcion === "5") {
            reportes.mejoresYPeoresEstudiantes();
            setTimeout(mostrarMenuReportes, 2000);
        } else if (opcion === "6") {
            reportes.rankingEstudiantes();
            setTimeout(mostrarMenuReportes, 2000);
        } else if (opcion === "7") {
            reportes.cantidadAprobadosReprobados();
            setTimeout(mostrarMenuReportes, 2000);
        } else if (opcion === "8") {
            reportes.reporteRendimientoAcademico();
            setTimeout(mostrarMenuReportes, 2000);
        } else if (opcion === "9") {
            reportes.promedioPorArea();
            setTimeout(mostrarMenuReportes, 2000);
        } else if (opcion === "10") {
            rl.question("Ingrese el área de estudio: ", area => {
                reportes.filtrarPorArea(area);
                setTimeout(mostrarMenuReportes, 2000);
            });
        } else if (opcion === "11") {
            mostrarMenu();
        } else {
            console.log("Opción no válida.");
            setTimeout(mostrarMenuReportes, 1500);
        }
    });
}

export { mostrarMenu };