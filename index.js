import GestorEstudiantes from "./Modulos/GestorEstudiantes.js";

import readline from "readline";

const gestor = new GestorEstudiantes();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log("\n--- Sistema CRUD de Estudiantes ---");
    console.log("1. Agregar estudiante");
    console.log("2. Listar estudiantes");
    console.log("3. Actualizar estudiante");
    console.log("4. Eliminar estudiante");
    console.log("5. Salir");
    rl.question("Seleccione una opción: ", opcion => {
        if (opcion === "1") {
            rl.question("Nombre: ", nombre => {
                rl.question("Edad: ", edad => {
                    rl.question("Nivel: ", nivel => {
                        gestor.agregarEstudiante(nombre, parseInt(edad), nivel);
                        console.log("Estudiante agregado.");
                        mostrarMenu();
                    });
                });
            });
        } else if (opcion === "2") {
            gestor.listarEstudiantes();
            mostrarMenu();
        } else if (opcion === "3") {
            rl.question("ID del estudiante a actualizar: ", id => {
                rl.question("Nuevo nombre: ", nuevoNombre => {
                    rl.question("Nueva edad: ", nuevaEdad => {
                        rl.question("Nuevo nivel: ", nuevoNivel => {
                            gestor.actualizarEstudiante(parseInt(id), nuevoNombre, parseInt(nuevaEdad), nuevoNivel);
                            console.log("Estudiante actualizado.");
                            mostrarMenu();
                        });
                    });
                });
            });
        } else if (opcion === "4") {
            rl.question("ID del estudiante a eliminar: ", id => {
                gestor.eliminarEstudiante(parseInt(id));
                console.log("Estudiante eliminado.");
                mostrarMenu();
            });
        } else if (opcion === "5") {
            rl.close();
        } else {
            console.log("Opción no válida.");
            mostrarMenu();
        }
    });
}

mostrarMenu();