#!/usr/bin/env node

/**
 * Simple test runner for Express Craft CLI
 * Tests basic functionality without complex interactions
 */

import { execSync } from 'child_process'
import fs from 'fs-extra'
import { join } from 'path'
import chalk from 'chalk'

let totalTests = 0
let passedTests = 0

function log(message, color = 'white') {
  console.log(chalk[color](message))
}

function test(name, fn) {
  totalTests++
  try {
    log(`\n🧪 ${name}`, 'cyan')
    fn()
    passedTests++
    log(`✅ PASS`, 'green')
  } catch (error) {
    log(`❌ FAIL: ${error.message}`, 'red')
  }
}

function runCLI(args) {
  const isWindows = process.platform === 'win32'
  const cmd = isWindows
    ? `node bin/express-craft.js ${args}`
    : `node bin/express-craft.js ${args}`

  return execSync(cmd, {
    encoding: 'utf8',
    stdio: 'pipe',
    timeout: 10000,
  })
}

async function runTests() {
  log('🚀 Express Craft CLI Test Suite', 'cyan')
  log('='.repeat(40), 'gray') // Cleanup before tests
  if (await fs.pathExists('test-project')) {
    await fs.remove('test-project')
  }
  if (await fs.pathExists('test-no-nodemon')) {
    await fs.remove('test-no-nodemon')
  }

  // Test 1: Help command
  test('Help Command', () => {
    const output = runCLI('--help')
    if (!output.includes('Express Craft CLI')) {
      throw new Error('Help output missing expected text')
    }
  })

  // Test 2: Version command
  test('Version Command', () => {
    const output = runCLI('--version')
    if (!output.match(/\d+\.\d+\.\d+/)) {
      throw new Error('Version output invalid')
    }
  })
  // Test 3: Project creation (without npm install)
  test('Project Creation - No Install', () => {
    // Create project without installing dependencies
    const output = runCLI('test-project --stable --no-install')

    // Check if files were created (project is created in current directory)
    const projectPath = 'test-project'
    if (!fs.existsSync(projectPath)) {
      throw new Error('Project directory not created')
    }
    const requiredFiles = ['package.json', 'app.js', 'README.md']
    for (const file of requiredFiles) {
      if (!fs.existsSync(join(projectPath, file))) {
        throw new Error(`Missing file: ${file}`)
      }
    }

    // Validate package.json
    const packageJson = fs.readJsonSync(join(projectPath, 'package.json'))
    if (packageJson.name !== 'test-project') {
      throw new Error('Package.json name incorrect')
    }
  })

  // Test 4: Invalid project name
  test('Invalid Project Name', () => {
    try {
      runCLI('invalid name with spaces')
      throw new Error('Should have failed with invalid name')
    } catch (error) {
      // This should fail, which is correct
      if (error.message.includes('Should have failed')) {
        throw error
      }
    }
  })
  // Test 5: Project creation without nodemon
  test('Project Creation - No Nodemon', () => {
    // Create project without nodemon
    const output = runCLI('test-no-nodemon --no-nodemon --no-install')

    // Check if files were created
    const projectPath = 'test-no-nodemon'
    if (!fs.existsSync(projectPath)) {
      throw new Error('Project directory not created')
    }

    const requiredFiles = ['package.json', 'app.js', 'README.md']
    for (const file of requiredFiles) {
      if (!fs.existsSync(join(projectPath, file))) {
        throw new Error(`Missing file: ${file}`)
      }
    }

    // Validate package.json doesn't have nodemon
    const packageJson = fs.readJsonSync(join(projectPath, 'package.json'))
    if (packageJson.devDependencies && packageJson.devDependencies.nodemon) {
      throw new Error('Nodemon should not be included')
    }

    // Check that dev script uses --watch
    if (!packageJson.scripts.dev.includes('--watch')) {
      throw new Error('Dev script should use --watch instead of nodemon')
    }
  })
  // Cleanup after tests
  if (await fs.pathExists('test-project')) {
    await fs.remove('test-project')
  }
  if (await fs.pathExists('test-no-nodemon')) {
    await fs.remove('test-no-nodemon')
  }

  // Results
  log('\n' + '='.repeat(40), 'gray')
  log('📊 Test Results:', 'cyan')
  log(
    `Total: ${totalTests}, Passed: ${passedTests}, Failed: ${
      totalTests - passedTests
    }`
  )

  if (passedTests === totalTests) {
    log('🎉 All tests passed!', 'green')
    process.exit(0)
  } else {
    log('💥 Some tests failed!', 'red')
    process.exit(1)
  }
}

runTests().catch((error) => {
  log(`Fatal error: ${error.message}`, 'red')
  process.exit(1)
})
