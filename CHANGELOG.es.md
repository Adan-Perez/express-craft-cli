# Historial de Cambios

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere al [Versionado Semántico](https://semver.org/lang/es/).

## [0.2.0] - 2025-06-15

### 🔄 **Migración Mayor: JavaScript → TypeScript**

**Esta versión representa una migración completa de JavaScript a TypeScript manteniendo 100% de compatibilidad hacia atrás.**

### Agregado

- 🟦 **Implementación completa en TypeScript** - Migración total del código fuente
- 📁 **Estructura modular** - Código organizado en `src/core/`, `src/utils/`, `src/types/`
- 🔒 **Tipado estricto** - Seguridad de tipos mejorada en todo el código
- 📦 **Distribución compilada** - TypeScript compila a `dist/` para distribución npm
- 🏗️ **Sistema de build profesional** - Configuración moderna de TypeScript con source maps
- 📚 **Definiciones de tipos** - Definiciones completas de TypeScript (.d.ts) incluidas
- 🗂️ **Preservación del legacy** - Código JavaScript original preservado en carpeta `legacy/`
- 📋 **Documentación de migración** - Guía completa de migración y changelog

### Cambiado

- 🔧 **Punto de entrada**: Ahora usa `dist/cli.js` (compilado desde TypeScript)
- 📝 **Mensaje de ayuda**: Mejorado con marca "Express Craft CLI" en la descripción
- 🧪 **Tests**: Actualizados para funcionar con la nueva estructura compilada
- 📦 **Estructura del paquete**: Paquete npm más limpio (19.6 kB) solo con archivos necesarios
- ⚙️ **Flujo de desarrollo**: Desarrollo TypeScript-first con `npm run dev`

### Corregido

- 🐛 **Interpolación de plantillas**: Corregidos template strings para interpolar nombres de proyectos correctamente
- 🎨 **Posicionamiento del mensaje de bienvenida**: Ahora aparece solo en comandos interactivos, no en help/version
- ✅ **Todos los tests pasando**: 13/13 tests pasan (5 básicos + 8 comprehensivos)

### Detalles Técnicos

- **Versión de TypeScript**: 5.8.3
- **Target de build**: ES2022 con módulos ESNext
- **Verificación de tipos**: Modo estricto habilitado
- **Source maps**: Incluidos para debugging
- **Compatibilidad Node.js**: >= 22.0.0 (sin cambios)

### Ruta de Migración

Para desarrolladores que contribuyen a este proyecto:

- El código fuente ahora está en `src/` (TypeScript)
- Compilar con `npm run build` (genera `dist/`)
- Desarrollar con `npm run dev` (usa tsx para ejecución directa de TS)
- Código JS original preservado en `legacy/` para referencia

**⚠️ Para usuarios finales**: ¡No se requieren cambios - el CLI funciona exactamente igual!

---

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
- [x] ~~Soporte para TypeScript~~ ✅ **Completado en v0.2.0**
- [ ] Integración con bases de datos populares
- [ ] Integración con Docker
- [ ] Templates de generación de proyectos TypeScript
- [ ] Opciones de configuración ESLint/Prettier

---

Para más detalles, visita las [releases](https://github.com/Adan-Perez/express-craft-cli/releases) en GitHub.
