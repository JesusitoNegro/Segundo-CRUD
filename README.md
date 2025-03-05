# Segundo-CRUD

# 📚 Sistema CRUD de Gestión de Estudiantes

Este es un sistema de gestión de estudiantes basado en consola, desarrollado en **JavaScript** utilizando **ES Modules**. Permite realizar operaciones CRUD y generar reportes académicos avanzados utilizando métodos de **map, filter, find, reduce, sort y slice**.

## 📂 Estructura del Proyecto
```
/gestor-estudiantes-js
│── modulos/
│   ├── Estudiante.js
│   ├── GestorEstudiantes.js
│   ├── reportes.js
│── index.js
│── README.md
```

## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/gestor-estudiantes-js.git
cd gestor-estudiantes-js
```

### 2️⃣ Asegurar que Node.js esté Instalado
Verifica que tienes **Node.js** instalado ejecutando:
```bash
node -v
```
Si no lo tienes, descárgalo desde [aquí](https://nodejs.org/).

### 3️⃣ Ejecutar el Programa
```bash
node index.js
```

## 📌 Funcionalidades Disponibles

### 🔹 **Menú Principal**
- `1` Agregar estudiante
- `2` Listar estudiantes
- `3` Buscar estudiante por ID o nombre
- `4` Generar reportes
- `5` Salir del programa

### 🔹 **Submenú de Reportes**
- `1` Promedio de cada estudiante
- `2` Filtrar estudiantes con promedio mayor a un umbral
- `3` Aprobados y reprobados por materia
- `4` Promedio general del grupo
- `5` Mejores y peores estudiantes
- `6` Ranking de estudiantes
- `7` Cantidad de aprobados y reprobados
- `8` Reporte de rendimiento académico
- `9` Volver al menú principal

## 🛠️ Ejemplo de Uso

### ➕ **Agregar un estudiante**
```
Nombre: Juan Pérez
Edad: 20
Nivel: Informática
Calificaciones: {"Matemáticas": 85, "Programación": 90}
```

### 🔍 **Buscar un estudiante**
```
Ingrese ID o nombre del estudiante: Juan Pérez
{ "id": 1, "nombre": "Juan Pérez", "edad": 20, "nivel": "Informática", "calificaciones": { "Matemáticas": 85, "Programación": 90 } }
```

### 📊 **Generar reportes**
```
Seleccione una opción: 4 (Generar reportes)
Seleccione una opción: 1 (Promedio de cada estudiante)
[
  { "nombre": "Juan Pérez", "promedio": 87.5, "nivel": "Informática" }
]
```

## 📝 Notas
- Usa **Node.js** versión **16 o superior**.
- Asegúrate de ingresar calificaciones en formato JSON válido.
- Puedes salir del programa en cualquier momento presionando **CTRL + C**.

🚀 **¡Disfruta programando y mejorando este sistema!**
