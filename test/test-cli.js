#!/usr/bin/env node

/**
 * Comprehensive test suite for Express Craft CLI
 * Tests all CLI functionality including project generation,
 * validation, dependency strategies, and the new --no-nodemon option.
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
    ? `node dist/cli.js ${args}`
    : `node dist/cli.js ${args}`

  return execSync(cmd, {
    encoding: 'utf8',
    stdio: 'pipe',
    timeout: 15000,
  })
}

async function runTests() {
  log('🚀 Express Craft CLI - Comprehensive Test Suite', 'cyan')
  log('='.repeat(50), 'gray')

  // Cleanup before tests
  const testProjects = [
    'test-stable',
    'test-latest',
    'test-no-nodemon',
    'test-basic',
  ]
  for (const project of testProjects) {
    if (await fs.pathExists(project)) {
      await fs.remove(project)
    }
  }

  // Test 1: Help command
  test('Help Command', () => {
    const output = runCLI('--help')
    if (!output.includes('Express Craft CLI')) {
      throw new Error('Help output missing expected text')
    }
    if (!output.includes('--no-nodemon')) {
      throw new Error('Help should show --no-nodemon option')
    }
  })

  // Test 2: Version command
  test('Version Command', () => {
    const output = runCLI('--version')
    if (!output.match(/\d+\.\d+\.\d+/)) {
      throw new Error('Version output invalid')
    }
  })

  // Test 3: Project creation with stable dependencies
  test('Project Creation - Stable Dependencies', () => {
    const output = runCLI('test-stable --stable --no-install')

    const projectPath = 'test-stable'
    if (!fs.existsSync(projectPath)) {
      throw new Error('Project directory not created')
    }

    const requiredFiles = ['package.json', 'app.js', 'README.md']
    for (const file of requiredFiles) {
      if (!fs.existsSync(join(projectPath, file))) {
        throw new Error(`Missing file: ${file}`)
      }
    }

    // Check package.json has nodemon by default
    const packageJson = fs.readJsonSync(join(projectPath, 'package.json'))
    if (!packageJson.devDependencies?.nodemon) {
      throw new Error('Should include nodemon by default')
    }
    if (!packageJson.scripts.dev.includes('nodemon')) {
      throw new Error('Dev script should use nodemon by default')
    }
  })

  // Test 4: Project creation with latest dependencies
  test('Project Creation - Latest Dependencies', () => {
    const output = runCLI('test-latest --latest --no-install')

    const projectPath = 'test-latest'
    if (!fs.existsSync(projectPath)) {
      throw new Error('Project directory not created')
    }

    const packageJson = fs.readJsonSync(join(projectPath, 'package.json'))
    if (packageJson.name !== 'test-latest') {
      throw new Error('Package.json name incorrect')
    }
  })

  // Test 5: Project creation without nodemon
  test('Project Creation - No Nodemon', () => {
    const output = runCLI('test-no-nodemon --no-nodemon --no-install')

    const projectPath = 'test-no-nodemon'
    if (!fs.existsSync(projectPath)) {
      throw new Error('Project directory not created')
    }

    const packageJson = fs.readJsonSync(join(projectPath, 'package.json'))

    // Should not have nodemon in devDependencies
    if (packageJson.devDependencies && packageJson.devDependencies.nodemon) {
      throw new Error('Should not include nodemon when --no-nodemon is used')
    }

    // Should use --watch in dev script
    if (!packageJson.scripts.dev.includes('--watch')) {
      throw new Error('Should use --watch when nodemon is disabled')
    }

    // Check README mentions --watch
    const readmeContent = fs.readFileSync(
      join(projectPath, 'README.md'),
      'utf8'
    )
    if (!readmeContent.includes('Node.js --watch')) {
      throw new Error(
        'README should mention Node.js --watch when nodemon is disabled'
      )
    }
  })

  // Test 6: Combined options
  test('Combined Options - Latest + No Nodemon', () => {
    const output = runCLI('test-combined --latest --no-nodemon --no-install')

    const projectPath = 'test-combined'
    if (!fs.existsSync(projectPath)) {
      throw new Error('Project directory not created')
    }

    const packageJson = fs.readJsonSync(join(projectPath, 'package.json'))

    // Should not have nodemon
    if (packageJson.devDependencies && packageJson.devDependencies.nodemon) {
      throw new Error('Should not include nodemon')
    }

    // Should use --watch
    if (!packageJson.scripts.dev.includes('--watch')) {
      throw new Error('Should use --watch')
    }

    // Should have express dependency
    if (!packageJson.dependencies.express) {
      throw new Error('Should have express dependency')
    }
  })

  // Test 7: Invalid project name
  test('Invalid Project Name Validation', () => {
    try {
      runCLI('invalid name with spaces --no-install')
      throw new Error('Should have failed with invalid name')
    } catch (error) {
      // This should fail, which is correct
      if (error.message.includes('Should have failed')) {
        throw error
      }
    }
  })

  // Test 8: Project summary shows correct information
  test('Project Summary Information', () => {
    const output = runCLI('test-summary --no-nodemon --no-install')

    if (!output.includes('(no nodemon)')) {
      throw new Error('Summary should indicate when nodemon is disabled')
    }

    if (!output.includes('test-summary')) {
      throw new Error('Summary should show project name')
    }
  })

  // Cleanup after tests
  const allTestProjects = [
    'test-stable',
    'test-latest',
    'test-no-nodemon',
    'test-combined',
    'test-summary',
  ]
  for (const project of allTestProjects) {
    if (await fs.pathExists(project)) {
      await fs.remove(project)
    }
  }
  // Results
  log('\n' + '='.repeat(50), 'gray')
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
