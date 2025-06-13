# Express Craft CLI - Testing

This directory contains the test suite for Express Craft CLI.

## Test Files

### `test-simple.js`
Quick and lightweight test suite that covers the essential functionality:
- ✅ Help command (`--help`)
- ✅ Version command (`--version`)
- ✅ Project creation with `--no-install` flag
- ✅ Project creation with `--no-nodemon` flag
- ✅ Invalid project name validation

### `test-cli.js`
Comprehensive test suite with detailed testing:
- ✅ Stable dependency strategy testing
- ✅ Latest dependency strategy testing  
- ✅ Nodemon vs Node.js --watch testing
- ✅ Combined options testing (--latest + --no-nodemon)
- ✅ Project summary information validation
- ✅ Invalid project name validation
- ✅ Generated file content validation

## Running Tests

```bash
# Run simple test suite (recommended for development)
npm test

# Run comprehensive test suite (full validation)
npm run test:full
```

## Test Coverage

### Current Test Coverage
- ✅ CLI argument parsing
- ✅ Help and version commands
- ✅ Project creation (files and structure)
- ✅ Project name validation
- ✅ Dependencies configuration (stable/latest)
- ✅ Nodemon inclusion/exclusion logic
- ✅ Node.js --watch fallback
- ✅ Package.json generation
- ✅ README.md generation
- ✅ Combined options handling

### Testing Strategy
- Tests use the `--no-install` flag to avoid npm installation during testing
- Temporary test projects are created and cleaned up automatically
- Each test is isolated and independent
- Tests validate both command success/failure and generated file structure
- Content validation ensures generated files have correct configurations

## Test Development

When adding new features to the CLI, make sure to:

1. Add corresponding tests to `test-simple.js` for basic functionality
2. Add comprehensive tests to `test-cli.js` for detailed scenarios
3. Test both success and error scenarios
4. Validate generated file contents when applicable
5. Ensure tests clean up after themselves
6. Test option combinations

## Test Architecture

### Simple Tests (`test-simple.js`)
- Fast execution (< 5 seconds)
- Essential functionality only
- Good for development workflow
- 5 core tests

### Comprehensive Tests (`test-cli.js`)
- Thorough validation (< 15 seconds)
- All feature combinations
- Content validation
- Good for CI/CD pipelines
- 8 detailed tests

## Notes

- Tests are designed to work on both Windows and Unix systems
- The `--no-install` option was specifically added to facilitate testing
- The `--no-nodemon` option is fully tested in both test suites
- Test output uses colors and emojis for better readability
- All tests run synchronously to avoid race conditions
