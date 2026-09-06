# Sistema de Gestión Documental - Escuela Básica G-733 Chorombo Bajo

**Institución:** Escuela Básica G-733 Chorombo Bajo, Comuna de María Pinto.  
**Usuario Principal:** Equipo Directivo del establecimiento.  
**Propósito:** Plataforma web Frontend centralizada para la administración, búsqueda, registro, edición y seguimiento de documentación interna institucional (Memos, Oficios, Citaciones y Acuerdos de Apoderados, Reuniones Comunales y Permisos Administrativos).

---

## 1. Enlaces del Proyecto

* **Repositorio en GitHub:** [https://github.com/agenteialaprofemyriam-stack/gestor-documental-chorombo](https://github.com/agenteialaprofemyriam-stack/gestor-documental-chorombo)
* **Despliegue en Producción:** [https://gestor-documental-chorombo.vercel.app](https://gestor-documental-chorombo.vercel.app)

---

## 2. Tecnologías y Justificación de la Arquitectura

* **Framework:** React 18+ estructurado sobre Vite.
* **Estilos y UI:** Bootstrap 5.3 y Bootstrap Icons.
* **Almacenamiento Local / Simulación:** Persistencia reactiva en `localStorage` sincronizada inicialmente con `db.json`.

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
│   │   └── db.json                    # Mock data inicial de tipos y documentos
│   ├── services/
│   │   └── documentService.js         # Capa de consumo de API y persistencia local
│   ├── App.css
│   ├── App.jsx                        # Orquestador del estado global y vistas modales
│   ├── index.css
│   └── main.jsx                       # Punto de entrada y montaje del DOM
├── index.html
├── package.json
└── vite.config.js