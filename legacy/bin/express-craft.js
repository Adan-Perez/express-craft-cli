#!/usr/bin/env node

/**
 * Express Craft CLI - Main entry point
 *
 * A CLI tool to scaffold Express.js applications with modern tooling
 * and best practices. Supports interactive mode, dependency strategies,
 * and automatic project setup.
 *
 * @author Adan-Perez
 * @version 0.1.0
 */

import { program } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import fs from 'fs-extra'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

// Import our modules
import { promptProjectName } from '../lib/prompts.js'
import { createBasicProject } from '../lib/generator.js'
import { runNpmInstall } from '../lib/installer.js'
import {
  validateProjectName,
  displayProjectSummary,
  displaySuccessInstructions,
} from '../lib/utils.js'

// ES Modules helpers
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read package.json for version info
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf-8')
)

// Display welcome message
console.log(chalk.cyan.bold('🚀 Express Craft CLI'))
console.log(
  chalk.gray(`v${packageJson.version} - Create Express.js applications\n`)
)

// Configure main command
program
  .name('express-craft')
  .description('🛠️ Create a new Express.js application with basic template')
  .version(packageJson.version)
  .argument('[project-name]', '📁 Name of the project to create')
  .option('-y, --yes', '⚡ Skip prompts and use defaults')
  .option('--latest', '🔥 Use latest versions of dependencies (experimental)')
  .option('--stable', '🛡️ Use stable/tested versions (default)')
  .option('--no-install', '📦 Skip npm install (for testing)')
  .option(
    '--no-nodemon',
    '🚫 Skip nodemon installation (use Node.js --watch or other tools)'
  )
  .option(
    '--fetch-versions',
    '📡 Fetch latest stable versions from npm (slower but more current)'
  )
  .action(async (projectName, options) => {
    try {
      // Get project name (prompt if not provided)
      let name = projectName
      if (!name) {
        name = await promptProjectName()
      }

      // Validate project name
      const errors = validateProjectName(name)
      if (errors.length > 0) {
        console.log(chalk.red('❌ Invalid project name:'))
        errors.forEach((error) => console.log(chalk.red(`  • ${error}`)))
        process.exit(1)
      }

      // Check if directory already exists
      const projectPath = resolve(process.cwd(), name)
      if (await fs.pathExists(projectPath)) {
        const files = await fs.readdir(projectPath)
        if (files.length > 0) {
          console.log(
            chalk.red(`❌ Directory "${name}" already exists and is not empty!`)
          )
          process.exit(1)
        }
      }

      // Display project summary
      await displayProjectSummary(name, projectPath, options)

      // Create project files
      const spinner = ora('Creating project structure...').start()
      await createBasicProject(projectPath, name, options)
      spinner.succeed(chalk.green('Project created successfully! 🎉'))

      // Install dependencies (unless --no-install is specified)
      if (options.install !== false) {
        spinner.start('Installing dependencies...')
        try {
          await runNpmInstall(projectPath)
          spinner.succeed(
            chalk.green('Dependencies installed successfully! 📦')
          )
          displaySuccessInstructions(name, true)
        } catch (installError) {
          spinner.warn(
            'Dependencies installation failed, but project was created'
          )
          console.log(
            chalk.red('\n❌ Installation failed:'),
            installError.message
          )
          displaySuccessInstructions(name, false)
        }
      } else {
        console.log(
          chalk.yellow('\n📦 Skipping npm install (--no-install specified)')
        )
        displaySuccessInstructions(name, false)
      }
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error.message)
      process.exit(1)
    }
  })

// Parse CLI arguments
program.parse()
