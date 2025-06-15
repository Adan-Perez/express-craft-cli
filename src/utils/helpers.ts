import chalk from 'chalk'
import type {
  CLIOptions,
  DependencyVersions,
  ValidationError,
} from '../types/index.js'
import { DEPENDENCY_STRATEGIES } from '../core/config.js'
import { getDynamicDependencyStrategies } from './version-resolver.js'

/**
 * Get dependencies based on strategy
 */
export async function getDependencies(
  options: CLIOptions,
  useDynamic: boolean = false
): Promise<DependencyVersions> {
  let strategy: keyof typeof DEPENDENCY_STRATEGIES = 'stable'

  if (options.latest) {
    strategy = 'experimental'
    console.log(chalk.yellow('🔥 Using experimental/latest versions'))
  } else if (options.stable) {
    strategy = 'stable'
    console.log(chalk.green('🛡️ Using stable/tested versions'))
  }

  // If dynamic versions requested, return promise
  if (useDynamic && strategy === 'stable') {
    console.log(chalk.blue('📡 Fetching latest stable versions from npm...'))
    const strategies = await getDynamicDependencyStrategies()
    return strategies[strategy]
  }

  return DEPENDENCY_STRATEGIES[strategy]
}

/**
 * Validate project name
 */
export function validateProjectName(name: string): ValidationError[] {
  const errors: ValidationError[] = []

  if (!name || !name.trim()) {
    errors.push({
      field: 'name',
      message: 'Project name is required',
    })
  }

  if (name && !/^[a-zA-Z0-9][a-zA-Z0-9-_]*$/.test(name)) {
    errors.push({
      field: 'name',
      message:
        'Project name must start with a letter or number and can only contain letters, numbers, hyphens and underscores',
    })
  }

  if (name && name.startsWith('-')) {
    errors.push({
      field: 'name',
      message: 'Project name cannot start with a hyphen',
    })
  }

  return errors
}

/**
 * Display project summary
 */
export async function displayProjectSummary(
  name: string,
  projectPath: string,
  options: CLIOptions
): Promise<void> {
  console.log(chalk.cyan('\n📋 Project Summary:'))
  console.log(chalk.white(`   Name: ${name}`))
  console.log(chalk.white(`   Template: basic`))
  console.log(chalk.white(`   Path: ${projectPath}`))

  // Show dependency strategy
  const deps = await getDependencies(options, options.fetchVersions)
  const strategy = options.latest ? 'latest' : 'stable'
  const includeNodemon = options.nodemon !== false

  const depsText = includeNodemon
    ? `Express ${deps.express}, Nodemon ${deps.nodemon}`
    : `Express ${deps.express} (no nodemon)`

  console.log(chalk.white(`   Dependencies: ${strategy} (${depsText})`))
  console.log()
}

/**
 * Display success instructions
 */
export function displaySuccessInstructions(
  projectName: string,
  wasInstalled: boolean = false
): void {
  if (wasInstalled) {
    console.log(chalk.cyan.bold('\n🚀 Your project is ready!'))
    console.log(chalk.white(`   cd ${projectName}`))
    console.log(chalk.white(`   npm run dev`))
  } else {
    console.log(chalk.yellow('\n⚠️  You can install dependencies manually:'))
    console.log(chalk.white(`   cd ${projectName}`))
    console.log(chalk.white(`   npm install`))
    console.log(chalk.white(`   npm run dev`))
  }
  console.log(chalk.gray('\n✨ Happy coding!\n'))
}
