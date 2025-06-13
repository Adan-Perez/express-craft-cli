# Express Craft CLI

🚀 Una poderosa herramienta CLI para crear aplicaciones Express.js con mejores prácticas y herramientas modernas.

## 🌐 Languages | Idiomas

- **English**: [README.md](./README.md)
- **Español**: [README.es.md](./README.es.md) (actual)

## Características

- ✨ **Modo Interactivo** - Creación de proyectos guiada con prompts
- 🛡️ **Estrategias de Dependencias** - Elige entre versiones estables, latest o experimentales
- 📦 **Instalación Inteligente** - npm install automático con manejo robusto de errores
- 🔧 **Setup Moderno** - ES Modules, listo para ESLint, enfocado en desarrollo
- 🏗️ **Arquitectura Limpia** - Templates de proyecto bien estructurados
- 🚫 **Desarrollo Flexible** - Nodemon opcional (puede usar Node.js --watch)
- 🧪 **Soporte para Testing** - Suite de pruebas integrada y opción `--no-install`

## Instalación

### Instalación Global (Recomendada)

```bash
npm install -g express-craft
```

### Desarrollo Local

```bash
git clone https://github.com/Adan-Perez/express-craft-cli.git
cd express-craft-cli
npm install
npm link
```

## Uso

### Uso Básico

```bash
# Modo interactivo
express-craft

# Creación directa de proyecto
express-craft mi-app

# Con estrategia de dependencias
express-craft mi-app --latest
express-craft mi-app --stable
```

### Opciones

| Opción             | Descripción                                                   |
| ------------------ | ------------------------------------------------------------- |
| `--latest`         | Usar versiones más recientes de dependencias (experimental)   |
| `--stable`         | Usar versiones estables/probadas (por defecto)                |
| `--no-install`     | Omitir npm install (útil para testing)                        |
| `--no-nodemon`     | Omitir instalación de nodemon (usar Node.js --watch)          |
| `--fetch-versions` | Buscar versiones estables más recientes desde npm (más lento) |
| `--help`           | Mostrar información de ayuda                                  |
| `--version`        | Mostrar número de versión                                     |

### Ejemplos

```bash
# Crear un nuevo proyecto con dependencias estables
express-craft mi-api --stable

# Crear un proyecto con dependencias más recientes
express-craft app-experimental --latest

# Crear solo la estructura del proyecto (sin npm install)
express-craft proyecto-prueba --no-install

# Crear proyecto sin nodemon (usa Node.js --watch)
express-craft app-minima --no-nodemon

# Crear proyecto con versiones estables más recientes desde npm
express-craft app-actual --fetch-versions
```

## Estructura del Proyecto Generado

```
mi-app/
├── package.json         # Dependencias y scripts
├── app.js               # Aplicación principal de Express
├── README.md            # Documentación del proyecto
└── node_modules/        # Dependencias (si se instalan)
```

### Archivos Generados

- **`package.json`** - Configurado con Express, Nodemon y scripts apropiados
- **`app.js`** - Servidor Express básico con middleware JSON y ruta de ejemplo
- **`README.md`** - Documentación específica del proyecto con guía de inicio

## Contribuir

📋 **Documentación**:

- [CONTRIBUTING.md](./CONTRIBUTING.md) - English
- [CONTRIBUTING.es.md](./CONTRIBUTING.es.md) - Español

## Licencia

- [LICENSE](./LICENSE) - Este proyecto está licenciado bajo la Licencia MIT.

## Historial de Cambios

📜 **Historial de Cambios**:

- [CHANGELOG.md](./CHANGELOG.md) - English
- [CHANGELOG.es.md](./CHANGELOG.es.md) - Español

Todos los cambios notables de este proyecto están documentados en los archivos de historial.

---

**Hecho con ❤️ para la comunidad de Node.js**
