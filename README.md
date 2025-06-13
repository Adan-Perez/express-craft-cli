# Express Craft CLI

🚀 A powerful CLI tool to scaffold Express.js applications with best practices and modern tooling.

## 🌐 Languages | Idiomas

- **English**: [README.md](./README.md) (current)
- **Español**: [README.es.md](./README.es.md)

## Features

- ✨ **Interactive Mode** - Guided project creation with prompts
- 🛡️ **Dependency Strategies** - Choose between stable, latest, or experimental versions
- 📦 **Smart Installation** - Automatic npm install with robust error handling
- 🔧 **Modern Setup** - ES Modules, ESLint-ready, and development-focused
- 🏗️ **Clean Architecture** - Well-structured project templates
- 🚫 **Flexible Development** - Optional nodemon (can use Node.js --watch instead)
- 🧪 **Testing Support** - Built-in test suite and `--no-install` option for testing

## Installation

### Global Installation (Recommended)

```bash
npm install -g express-craft
```

### Local Development

```bash
git clone https://github.com/Adan-Perez/express-craft-cli.git
cd express-craft-cli
npm install
npm link
```

## Usage

### Basic Usage

```bash
# Interactive mode
express-craft

# Direct project creation
express-craft my-app

# With dependency strategy
express-craft my-app --latest
express-craft my-app --stable
```

### Options

| Option             | Description                                        |
| ------------------ | -------------------------------------------------- |
| `--latest`         | Use latest versions of dependencies (experimental) |
| `--stable`         | Use stable/tested versions (default)               |
| `--no-install`     | Skip npm install (useful for testing)              |
| `--no-nodemon`     | Skip nodemon installation (use Node.js --watch)    |
| `--fetch-versions` | Fetch latest stable versions from npm (slower)     |
| `--help`           | Show help information                              |
| `--version`        | Show version number                                |

### Examples

```bash
# Create a new project with stable dependencies
express-craft my-api --stable

# Create a project with latest dependencies
express-craft bleeding-edge-app --latest

# Create project structure only (no npm install)
express-craft test-project --no-install

# Create project without nodemon (uses Node.js --watch)
express-craft minimal-app --no-nodemon

# Create project with latest stable versions from npm
express-craft current-app --fetch-versions
```

## Generated Project Structure

```
my-app/
├── package.json         # Dependencies and scripts
├── app.js               # Main Express application
├── README.md            # Project documentation
└── node_modules/        # Dependencies (if installed)
```

### Generated Files

- **`package.json`** - Configured with Express, Nodemon, and proper scripts
- **`app.js`** - Basic Express server with JSON middleware and sample route
- **`README.md`** - Project-specific documentation with getting started guide

## Contributing

📋 **Documentation**:

- [CONTRIBUTING.md](./CONTRIBUTING.md) - English
- [CONTRIBUTING.es.md](./CONTRIBUTING.es.md) - Español

## License

-[LICENSE](./LICENSE) - This project is licensed under the MIT License.

## Changelog

📜 **Change History**:

- [CHANGELOG.md](./CHANGELOG.md) - English
- [CHANGELOG.es.md](./CHANGELOG.es.md) - Español

All notable changes to this project are documented in the changelog files.

---

**Made with ❤️ for the Node.js community**
