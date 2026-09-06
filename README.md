# Sistema de Gestión Documental - Escuela Básica G-733 Chorombo Bajo

* **Institución:** Escuela Básica G-733 Chorombo Bajo, Comuna de María Pinto.
* **Representante / Contraparte:** Patricia Gajardo Órdenes (Directora) - `pgajardo@corpmpinto.cl`.
* **Contexto de la Comunidad Escolar:** Matrícula de 208 estudiantes (niveles prekínder a 8.º básico)[cite: 2].
* **Usuario Objetivo:** Equipo Directivo del establecimiento.
* **Propósito:** Plataforma web Frontend centralizada para optimizar los recursos humanos y financieros del establecimiento mediante la digitalización del archivo manual. Administra memos, oficios, citaciones de apoderados, acuerdos de apoderados, documentos de reuniones comunales y permisos administrativos[cite: 2].

---

## 1. Enlaces del Proyecto

* **Repositorio en GitHub:** [https://github.com/agenteialaprofemyriam-stack/gestor-documental-chorombo](https://github.com/agenteialaprofemyriam-stack/gestor-documental-chorombo)[cite: 1]
* **Despliegue en Producción (Vercel):** [https://gestor-documental-chorombo.vercel.app](https://gestor-documental-chorombo.vercel.app)[cite: 1]

---

## 2. Tecnologías y Justificación de la Arquitectura

* **Framework:** React 18+ sobre Vite (Single Page Application liviana y de alto rendimiento).
* **Estilos y UI:** Bootstrap 5.3 y Bootstrap Icons.
* **Almacenamiento Local / Simulación:** Persistencia reactiva en `localStorage` sincronizada inicialmente con `db.json`.
* **Justificación técnica según infraestructura del cliente:** La escuela dispone de equipamiento básico en terreno (notebook Intel Core i5 con 8 GB RAM y sin privilegios de administración local)[cite: 2]. La arquitectura SPA desplegada en la nube elimina la necesidad de instalaciones locales complejas, garantizando una carga rápida en navegadores web convencionales sin degradar la memoria del equipo.

### Estructura de Directorios
```text
gestor-documental-chorombo/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   └── ConfirmModal.jsx       # Modal de confirmación para borrado seguro
│   │   ├── documents/
│   │   │   ├── DocumentDetail.jsx     # Ficha de visualización de documento
│   │   │   ├── DocumentFilters.jsx    # Barra de búsqueda y selector por tipo
│   │   │   ├── DocumentForm.jsx       # Formulario modal de creación y edición
│   │   │   └── DocumentList.jsx       # Tabla responsiva y badges de estado
│   │   └── layout/
│   │       └── Navbar.jsx             # Barra superior institucional
│   ├── data/
│   │   └── db.json                    # Mock data inicial con los 6 tipos requeridos
│   ├── services/
│   │   └── documentService.js         # Capa de consumo de API y persistencia local
│   ├── App.css
│   ├── App.jsx                        # Orquestador del estado global y vistas modales
│   ├── index.css
│   └── main.jsx                       # Punto de entrada y montaje del DOM
├── index.html
├── package.json
└── vite.config.js


## 3. Catálogo y Responsabilidad de Componentes

1. **`Navbar` (`layout/Navbar.jsx`):**

   * *Responsabilidad:* Encabezado institucional con identificación del colegio y perfil del Equipo Directivo[cite: 1, 2].

   * *Entradas:* Estáticas[cite: 1].

2. **`DocumentFilters` (`documents/DocumentFilters.jsx`):**

   * *Responsabilidad:* Controlar los criterios de búsqueda reactiva por texto y tipología (memos, oficios, citaciones, acuerdos, reuniones, permisos)[cite: 1, 2]. Habilita la apertura del formulario de creación[cite: 1].

   * *Entradas:* `searchTerm`, `selectedTipo`, array `tipos`, callbacks para cambio de filtros y botón nuevo documento[cite: 1].

3. **`DocumentList` (`documents/DocumentList.jsx`):**

   * *Responsabilidad:* Renderizar la nómina de documentos en tabla responsiva con badges visuales diferenciados por categoría y botones de acción[cite: 1].

   * *Entradas:* Lista de `documentos`, array `tipos`, callbacks (`onSelectView`, `onSelectEdit`, `onSelectDelete`)[cite: 1].

4. **`DocumentForm` (`documents/DocumentForm.jsx`):**

   * *Responsabilidad:* Formulario modal interactivo para crear y actualizar registros con validación de obligatoriedad en cliente[cite: 1].

   * *Entradas:* Booleano `show`, objeto `initialData`, catálogo `tipos`, callbacks `onClose` y `onSave`[cite: 1].

5. **`DocumentDetail` (`documents/DocumentDetail.jsx`):**

   * *Responsabilidad:* Presentar la ficha de consulta detallada de un documento sin permitir su alteración[cite: 1].

   * *Entradas:* Booleano `show`, objeto `doc`, catálogo `tipos`, callback `onClose`[cite: 1].

6. **`ConfirmModal` (`common/ConfirmModal.jsx`):**

   * *Responsabilidad:* Modal de confirmación previa para evitar borrados accidentales de actas y oficios escolares sensibles[cite: 1, 2].

   * *Entradas:* Booleano `show`, `title`, `message`, callbacks `onConfirm` y `onClose`[cite: 1].

   ---

## 4. Resolución de Problemas Técnicos en el Desarrollo

* **Problema Identificado:** Fallo al procesar la carga inicial de datos desde el archivo mock (`SyntaxError: Unexpected end of JSON input at documentService.js`)[cite: 1].

* **Causa Raíz:** El archivo `db.json` se creó vacío en disco, por lo que `fetch()` intentó parsear un payload sin contenido estructural válido[cite: 1].

* **Alternativas Evaluadas:**
  1. Forzar un array vacío por defecto dentro de un bloque `try/catch`[cite: 1].
  2. Poblar `src/data/db.json` con la estructura institucional e integrar un fallback automático en `localStorage`[cite: 1, 2].

* **Solución Implementada:** Se estructuró `db.json` con los 6 tipos documentales oficiales y tres registros de prueba[cite: 1, 2], complementado con un fallback en `documentService.js` que inicializa el almacenamiento local si está vacío[cite: 1].

* **Resultado y Aprendizaje:** La aplicación mantiene estabilidad operativa continua ante recargas de página o almacenamiento limpio, desacoplando los fallos de lectura de la experiencia de usuario[cite: 1].

---

## 5. Accesibilidad (WCAG 2.1) y Usabilidad

* **Contraste y Legibilidad:** Relación de contraste superior a 4.5:1 en textos y badges según WCAG 2.1 nivel AA[cite: 1].

* **Semántica y Navegación:** Uso de etiquetas semánticas (`<main>`, `<nav>`, `<form>`, `<button>`) y atributos descriptivos `aria-label` en los botones de acción para lectores de pantalla[cite: 1].

* **Prueba de Accesibilidad Realizada:**
  * *Criterio Evaluado:* WCAG 2.1 - Criterio 3.3.1 (Identificación de errores)[cite: 1].
  * *Problema Identificado:* Al intentar guardar campos vacíos, no existía indicación visual accesible ni marcado semántico de error[cite: 1].
  * *Mejora Implementada:* Validación reactiva con clases `.is-invalid` y textos `.invalid-feedback` visibles para cada campo obligatorio[cite: 1].

---

## 6. Buenas Prácticas Aplicadas al Proyecto

1. **Separación Estricta de Responsabilidades:** Lógica de datos aislada en `services/documentService.js`, separada de los componentes visuales[cite: 1].

2. **Elevación de Estado (Lifting State Up):** Centralización del estado en `App.jsx` para coordinar en tiempo real los filtros con el listado[cite: 1].

3. **Inmutabilidad en Manejo de Estado:** Uso de operadores spread y filtros funcionales para evitar mutaciones directas del array de documentos[cite: 1].

4. **Validación Preventiva:** Control en cliente para impedir envíos con datos en blanco o incompletos[cite: 1].

5. **Componentes Reutilizables:** Modal genérico `ConfirmModal` desacoplado para cualquier acción destructiva del sistema[cite: 1].

6. **Estandarización de Código:** Aplicación de reglas ESLint para mantener consistencia de sintaxis y eliminar dependencias huérfanas[cite: 1].

---

## 7. Optimización y Rendimiento

* **Acción 1 (Filtrado Reactivo en Memoria):**
  * *Situación Inicial:* Cada cambio en el buscador consultaba innecesariamente el almacenamiento[cite: 1].
  * *Optimización:* Filtrado derivado en memoria en `App.jsx` condicionado a `searchTerm` y `selectedTipo`[cite: 1].
  * *Beneficio:* Búsqueda instantánea (< 5 ms) que cuida los recursos del notebook de la escuela[cite: 1, 2].

* **Acción 2 (Carga Asíncrona con Feedback Visual):**
  * *Situación Inicial:* La tabla se mostraba vacía abruptamente antes de procesar los datos iniciales[cite: 1].
  * *Optimización:* Estado `loading` con spinner centrado durante la lectura del servicio[cite: 1].
  * *Beneficio:* Mitiga el salto visual (*layout shift*) y da certeza operativa al usuario directivo[cite: 1].

---

## 8. Matriz de Endpoints y Operaciones del Servicio

| Método HTTP | Endpoint Equivalente | Propósito Institucional | Payload Enviado | Respuesta Recibida |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/tipos-documento` | Listar las 6 categorías oficiales del colegio[cite: 2] | Ninguno[cite: 1] | Catálogo de tipos[cite: 1] |
| `GET` | `/api/documentos` | Obtener listado maestro de documentación[cite: 1] | Ninguno[cite: 1] | Arreglo de documentos[cite: 1] |
| `GET` | `/api/documentos/:id` | Visualizar ficha detallada de un documento[cite: 1] | Parámetro `id` en URL[cite: 1] | Objeto del documento[cite: 1] |
| `POST` | `/api/documentos` | Registrar nuevo memo, oficio o citación[cite: 1, 2] | Objeto con datos de formulario[cite: 1] | Documento creado con `id`[cite: 1] |
| `PUT` | `/api/documentos/:id` | Modificar datos de un documento existente[cite: 1] | Parámetro `id` y datos editados[cite: 1] | Documento actualizado[cite: 1] |
| `DELETE` | `/api/documentos/:id` | Eliminar documento con confirmación[cite: 1] | Parámetro `id` en URL[cite: 1] | Booleano de éxito[cite: 1] |

---

## 9. Seguridad en el Frontend

1. **Prevención de XSS:** Renderizado declarativo JSX (`{doc.titulo}`), evitando inyecciones de código malicioso en navegadores compartidos[cite: 1, 2].

2. **Sanitización de Datos de Entrada:** Validación estricta de obligatoriedad en el cliente previo a la persistencia[cite: 1].

3. **Ausencia de Credenciales:** Repositorio libre de claves o secretos estáticos[cite: 1].

4. **Manejo Seguro de Excepciones:** Control de errores asíncronos sin exponer trazas técnicas sensibles al usuario[cite: 1].

---

## 10. Retrospectiva y Mejora Continua

1. **Carga de Archivos Adjuntos (Prioridad Alta):**
   * *Situación:* La versión actual gestiona metadatos y resúmenes[cite: 1].
   * *Mejora:* Permitir subida y visualización de archivos PDF asociados[cite: 1].
   * *Responsable:* Desarrollador Frontend[cite: 1].

2. **Paginación de Registros (Prioridad Media):**
   * *Situación:* Sobre 300 documentos anuales podría sobrecargar el renderizado[cite: 1].
   * *Mejora:* Implementar paginación modular de 10 registros por vista[cite: 1].
   * *Responsable:* Desarrollador Frontend[cite: 1].

3. **Módulo de Reportes Estadísticos (Prioridad Media):**
   * *Situación:* La dirección no cuenta con un consolidado visual por período[cite: 1, 2].
   * *Mejora:* Gráficos resumen de documentos emitidos por tipología y mes[cite: 1].
   * *Responsable:* Equipo de Desarrollo[cite: 1].

* **Mejora de usabilidad aplicada en esta iteración:** Tras simular el flujo directivo con la Directora Patricia Gajardo[cite: 2], se integró el componente `ConfirmModal` antes de eliminar un registro[cite: 1], protegiendo actas y citaciones críticas de borrados accidentales[cite: 1, 2].

---

## 11. Instrucciones de Instalación y Ejecución Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/agenteialaprofemyriam-stack/gestor-documental-chorombo.git
   cd gestor-documental-chorombo