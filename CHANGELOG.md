# Changelog

All notable changes to Express Craft CLI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- [ ] TypeScript support
- [ ] Database integration
- [ ] Docker integration

---

For more details, visit the [releases](https://github.com/Adan-Perez/express-craft-cli/releases) on GitHub.
