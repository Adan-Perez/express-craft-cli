# Contributing to Express Craft CLI

Thank you for your interest in contributing to Express Craft CLI! 🚀

## How to Contribute

### Report Bugs

- Search existing issues before creating new ones
- Include specific details and steps to reproduce

### Suggest Features

- Explain the problem it solves
- Describe your proposed solution

### Pull Requests

1. Fork the repository
2. Create your branch: `git checkout -b feature/new-feature`
3. Commit: `git commit -am 'Add feature description'`
4. Push: `git push origin feature/new-feature`
5. Open a Pull Request

## Development Setup

### Requirements

- Node.js >= 22.0.0
- Git

### Installation

```bash
git clone https://github.com/Adan-Perez/express-craft-cli.git
cd express-craft-cli
npm install
npm link
express-craft --version  # Verify
```

### Commands

```bash
npm run dev       # Development
npm test          # Basic tests
npm run test:full # Full test suite
```

## Code Style

- ES Modules (`import/export`)
- Async/await over Promises
- JSDoc for public functions
- camelCase for variables

## FAQ

**Should I update documentation?**  
Yes, if you change functionality or CLI options.

**How do I add dependencies?**  
`npm install new-dependency` and document the purpose.

---

Thank you for contributing! 🎉
