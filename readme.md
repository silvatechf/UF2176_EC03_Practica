Aquí tienes un `README.md` profesional, conciso y directo, redactado en español, ideal para tu proyecto académico:

---

# Academia API

Este proyecto es una API RESTful desarrollada con **Node.js, Express y PostgreSQL** para la gestión de una academia. La API permite realizar consultas complejas sobre alumnos, cursos, profesores y matrículas.

## 🚀 Instalación

1. Clona el repositorio.
2. Instala las dependencias:
```bash
npm install

```


3. Configura tus variables de entorno en un archivo `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=academia
DB_USER=tu_usuario
DB_PASS=tu_password
PORT=3000

```


4. Inicia el servidor:
```bash
node app.js

```



## 📋 Endpoints Principales

| Acción | Endpoint | Descripción |
| --- | --- | --- |
| **Alumnos por edad** | `GET /api/consultas/alumnos/por-edad?edad=20` | Filtra alumnos por edad exacta. |
| **Rango de edad** | `GET /api/consultas/alumnos/rango?min=18&max=25` | Filtra alumnos entre dos edades. |
| **Top Cursos** | `GET /api/consultas/cursos/top-matriculados` | Cursos con mayor número de matrículas. |
| **Detalle Matrículas** | `GET /api/consultas/matriculas/info` | Relación de alumnos y sus cursos (JOIN). |
| **Info Académica** | `GET /api/consultas/profesores/detalle` | Profesor, curso y especialidad (JOIN 3 tablas). |
| **Alumnos por Curso** | `GET /api/consultas/cursos/total-alumnos` | Conteo de alumnos por curso (GROUP BY). |
| **Cursos Populares** | `GET /api/consultas/cursos/populares?min=5` | Cursos con más de X alumnos (HAVING). |

## 🛠 Tecnologías

* **Backend:** Node.js, Express
* **Base de Datos:** PostgreSQL
* **Driver:** `pg` (node-postgres)
* **Gestión:** Docker (para la base de datos)

---

