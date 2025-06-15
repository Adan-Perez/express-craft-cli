# Changelog

All notable changes to Express Craft CLI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-06-15

### 🔄 **Major Migration: JavaScript → TypeScript**

**This version represents a complete migration from JavaScript to TypeScript while maintaining 100% backward compatibility.**

### Added

- 🟦 **Full TypeScript implementation** - Complete migration of all source code
- 📁 **Modular structure** - Organized code in `src/core/`, `src/utils/`, `src/types/`
- 🔒 **Strict typing** - Enhanced type safety throughout the codebase
- 📦 **Compiled distribution** - TypeScript compiles to `dist/` for npm distribution
- 🏗️ **Professional build system** - Modern TypeScript configuration with source maps
- 📚 **Type definitions** - Full TypeScript definitions (.d.ts) included in npm package
- 🗂️ **Legacy preservation** - Original JavaScript code preserved in `legacy/` folder
- 📋 **Migration documentation** - Complete migration guide and changelog

### Changed

- 🔧 **Entry point**: Now uses `dist/cli.js` (compiled from TypeScript)
- 📝 **Help message**: Enhanced with "Express Craft CLI" branding in description
- 🧪 **Tests**: Updated to work with new compiled structure
- 📦 **Package structure**: Cleaner npm package (19.6 kB) with only necessary files
- ⚙️ **Development workflow**: TypeScript-first development with `npm run dev`

### Fixed

- 🐛 **Template interpolation**: Fixed template strings to properly interpolate project names
- 🎨 **Welcome message positioning**: Now appears only in interactive commands, not help/version
- ✅ **All tests passing**: 13/13 tests pass (5 basic + 8 comprehensive)

### Technical Details

- **TypeScript version**: 5.8.3
- **Build target**: ES2022 with ESNext modules
- **Type checking**: Strict mode enabled
- **Source maps**: Included for debugging
- **Node.js compatibility**: >= 22.0.0 (unchanged)

### Migration Path

For developers contributing to this project:

- Source code is now in `src/` (TypeScript)
- Build with `npm run build` (generates `dist/`)
- Develop with `npm run dev` (uses tsx for direct TS execution)
- Original JS code preserved in `legacy/` for reference

**⚠️ For end users**: No changes required - the CLI works exactly the same way!

---

## [0.1.0] - 2025-06-13

### Added

- ✨ Initial release of Express Craft CLI
- 🚀 Interactive mode with user prompts
- 🛡️ Dependency strategies (stable, latest, experimental)
- 📦 Automatic installation with robust error handling
- 🔧 Modern configuration with ES Modules
- 🏗️ Project generation with best practices
- 🚫 Flexible option to skip nodemon
- 🧪 Testing support with --no-install
- 📡 Dynamic version resolution from npm
- 🎨 Colorful interface and loading spinners

### Features

**Command**: `express-craft [project-name]`

**Main options**:

- `--latest` - Latest versions
- `--stable` - Stable versions (default)
- `--no-install` - Skip npm install
- `--no-nodemon` - Skip nodemon
- `--fetch-versions` - Fetch from npm

**Generates**: `package.json`, `app.js`, `README.md`

**Compatibility**: Node.js >= 22.0.0, Windows/macOS/Linux

---

## Upcoming Versions

### Planned Features

- [ ] Additional templates (REST API, GraphQL)
- [x] ~~TypeScript support~~ ✅ **Completed in v0.2.0**
- [ ] Database integration
- [ ] Docker integration
- [ ] TypeScript project generation templates
- [ ] ESLint/Prettier configuration options

---

For more details, visit the [releases](https://github.com/Adan-Perez/express-craft-cli/releases) on GitHub.
