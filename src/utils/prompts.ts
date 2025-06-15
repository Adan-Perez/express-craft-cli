import inquirer from 'inquirer'
import chalk from 'chalk'
import { validateProjectName } from './helpers.js'

/**
 * Prompt for project name with validation
 */
export async function promptProjectName(): Promise<string> {
  console.log(
    chalk.yellow("📝 Interactive mode - Let's create your project!\n")
  )

  const nameAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '📁 What is your project name?',
      default: 'my-express-app',
      validate: (input: string) => {
        const errors = validateProjectName(input)
        if (errors.length > 0) {
          return errors[0].message
        }
        return true
      },
    },
  ])

  return nameAnswer.projectName as string
}

/**
 * Future: Prompt for template selection (when we have more)
 */
export async function promptTemplate(): Promise<string> {
  // For now only basic, but prepared for expansion
  return 'basic'
}

/**
 * Future: Prompt for additional features
 */
export async function promptFeatures(): Promise<string[]> {
  // Prepared for CORS, validation, auth, etc.
  return []
}
