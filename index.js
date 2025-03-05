import GestorEstudiantes from "./Modulos/GestorEstudiantes.js";
import Reportes from "./Modulos/Reportes.js";
import readline from "readline";

const gestor = new GestorEstudiantes();
const reportes = new Reportes(gestor);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function agregarEstudiante() {
    rl.question("Nombre: ", nombre => {
        rl.question("Edad: ", edad => {
            rl.question("Nivel: ", nivel => {
                rl.question("Calificaciones (JSON: {materia: nota}): ", calificaciones => {
                    try {
                        const calificacionesObj = JSON.parse(calificaciones);
                        gestor.agregarEstudiante(nombre, parseInt(edad), nivel, calificacionesObj);
                        console.log("Estudiante agregado.");
                    } catch (error) {
                        console.log("Formato incorrecto. Usa JSON válido.");
                    }
                    mostrarMenu();
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
    console.log("5. Salir");

    rl.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            agregarEstudiante();
        } else if (opcion === "2") {
            console.log(gestor.listarEstudiantes());
            mostrarMenu();
        } else if (opcion === "3") {
            buscarEstudiante();
        } else if (opcion === "4") {
            mostrarMenuReportes();
        } else if (opcion === "5") {
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
    console.log("9. Volver al menú principal");

    rl.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            console.log(reportes.calcularPromedioPorEstudiante());
        } else if (opcion === "2") {
            rl.question("Ingrese el umbral: ", umbral => {
                console.log(reportes.filtrarPorPromedio(parseInt(umbral)));
                mostrarMenuReportes();
            });
        } else if (opcion === "3") {
            rl.question("Ingrese la materia: ", materia => {
                console.log(reportes.aprobadosYReprobadosPorMateria(materia));
                mostrarMenuReportes();
            });
        } else if (opcion === "4") {
            console.log(`Promedio General: ${reportes.calcularPromedioGeneral()}`);
            mostrarMenuReportes();
        } else if (opcion === "5") {
            console.log(reportes.mejoresYPeoresEstudiantes());
            mostrarMenuReportes();
        } else if (opcion === "6") {
            console.log(reportes.rankingEstudiantes());
            mostrarMenuReportes();
        } else if (opcion === "7") {
            console.log(reportes.cantidadAprobadosReprobados());
            mostrarMenuReportes();
        } else if (opcion === "8") {
            console.log(reportes.reporteRendimientoAcademico());
            mostrarMenuReportes();
        } else if (opcion === "9") {
            mostrarMenu();
        } else {
            console.log("Opción no válida.");
            mostrarMenuReportes();
        }
    });
}

mostrarMenu();
