import Estudiante from "./Estudiante.js";
import fs from 'fs';

class GestorEstudiantes {
    constructor() {
        this.estudiantes = [];

        // ✅ Cargar estudiantes desde el archivo JSON automáticamente
        this.cargarEstudiantesDesdeJSON();
    }

    cargarEstudiantesDesdeJSON() {
        try {
            const data = fs.readFileSync('./estudiantes.json', 'utf8'); // Lee el archivo JSON
            const estudiantesJSON = JSON.parse(data); // Convierte el JSON a un array de objetos
            
            estudiantesJSON.forEach(est => {
                this.agregarEstudiante(est.nombre, est.edad, est.area, est.calificaciones);
            });

            console.log("✅ Estudiantes precargados desde JSON correctamente.");
        } catch (error) {
            console.error("⚠️ Error al cargar el archivo JSON:", error.message);
        }
    }

    agregarEstudiante(nombre, edad, area, calificaciones = {}) {
        if (!calificaciones.Matematicas || !calificaciones.Naturales || !calificaciones.Sociales || !calificaciones.Espanol) {
            return "Error: Debe proporcionar calificaciones para todas las materias básicas.";
        }
        const nuevoEstudiante = new Estudiante(nombre, edad, area, calificaciones);
        this.estudiantes.push(nuevoEstudiante);
    }

    listarEstudiantes() {
        return this.estudiantes.map(est => ({
            ID: est.id,
            Nombre: est.nombre,
            Edad: est.edad,
            Área: est.area,
            Matemáticas: est.calificaciones?.Matematicas || "N/A",
            Naturales: est.calificaciones?.Naturales || "N/A",
            Sociales: est.calificaciones?.Sociales || "N/A",
            Español: est.calificaciones?.Espanol || "N/A"
        }));
    }

    buscarEstudiante(criterio) {
        return this.estudiantes.find(est => est.id === criterio || est.nombre.toLowerCase() === criterio.toLowerCase()) || "Estudiante no encontrado";
    }

    // ✅ Función para actualizar un estudiante
    actualizarEstudiante(id, rl, mostrarMenu) {
        const estudiante = this.estudiantes.find(est => est.id === id);
        if (!estudiante) {
            console.log("⚠️ Estudiante no encontrado.");
            mostrarMenu();
            return;
        }

        console.log(`📌 Actualizando información de: ${estudiante.nombre}`);

        rl.question(`Nuevo nombre (${estudiante.nombre}): `, nombre => {
            rl.question(`Nueva edad (${estudiante.edad}): `, edad => {
                rl.question(`Nueva área (${estudiante.area}): `, area => {
                    rl.question(`Nueva calificación en Matemáticas (${estudiante.calificaciones.Matematicas}): `, matematicas => {
                        rl.question(`Nueva calificación en Naturales (${estudiante.calificaciones.Naturales}): `, naturales => {
                            rl.question(`Nueva calificación en Sociales (${estudiante.calificaciones.Sociales}): `, sociales => {
                                rl.question(`Nueva calificación en Español (${estudiante.calificaciones.Espanol}): `, espanol => {
                                    
                                    estudiante.nombre = nombre || estudiante.nombre;
                                    estudiante.edad = edad ? parseInt(edad) : estudiante.edad;
                                    estudiante.area = area || estudiante.area;
                                    estudiante.calificaciones = {
                                        Matematicas: matematicas ? parseFloat(matematicas) : estudiante.calificaciones.Matematicas,
                                        Naturales: naturales ? parseFloat(naturales) : estudiante.calificaciones.Naturales,
                                        Sociales: sociales ? parseFloat(sociales) : estudiante.calificaciones.Sociales,
                                        Espanol: espanol ? parseFloat(espanol) : estudiante.calificaciones.Espanol
                                    };

                                    console.log("✅ Estudiante actualizado correctamente.");
                                    console.log("🔄 Volviendo al menú principal...\n");
                                    setTimeout(mostrarMenu, 1500);
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    // ✅ Función para eliminar un estudiante
    eliminarEstudiante(id, mostrarMenu) {
        const index = this.estudiantes.findIndex(est => est.id === id);
        
        if (index === -1) {
            console.log("⚠️ Estudiante no encontrado.");
            mostrarMenu();
            return;
        }

        this.estudiantes.splice(index, 1);
        console.log(`✅ Estudiante con ID ${id} eliminado correctamente.`);
        console.log("🔄 Volviendo al menú principal...\n");
        setTimeout(mostrarMenu, 1500);
    }
}

export default GestorEstudiantes;
