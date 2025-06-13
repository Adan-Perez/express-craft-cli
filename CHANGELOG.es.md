# Historial de Cambios

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere al [Versionado Semántico](https://semver.org/lang/es/).

## [0.1.0] - 2025-06-13

### Agregado

- ✨ Lanzamiento inicial de Express Craft CLI
- 🚀 Modo interactivo con prompts para el usuario
- 🛡️ Estrategias de dependencias (stable, latest, experimental)
- 📦 Instalación automática con manejo robusto de errores
- 🔧 Configuración moderna con ES Modules
- 🏗️ Generación de proyectos con mejores prácticas
- 🚫 Opción flexible para omitir nodemon
- 🧪 Soporte para testing con --no-install
- 📡 Resolución dinámica de versiones desde npm
- 🎨 Interfaz colorida y spinners de carga

### Características

**Comando**: `express-craft [nombre-proyecto]`

**Opciones principales**:

- `--latest` - Versiones más recientes
- `--stable` - Versiones estables (default)
- `--no-install` - Omitir npm install
- `--no-nodemon` - Omitir nodemon
- `--fetch-versions` - Buscar desde npm

**Genera**: `package.json`, `app.js`, `README.md`

**Compatibilidad**: Node.js >= 22.0.0, Windows/macOS/Linux

---

## Próximas Versiones

### Características Planeadas

- [ ] Templates adicionales (API REST, GraphQL)
- [ ] Soporte para TypeScript
- [ ] Integración con bases de datos populares
- [ ] Integración con Docker

---

Para más detalles, visita las [releases](https://github.com/Adan-Perez/express-craft-cli/releases) en GitHub.
