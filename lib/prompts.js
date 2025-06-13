import inquirer from 'inquirer'
import chalk from 'chalk'
import { validateProjectName } from './utils.js'

/**
 * Prompt for project name
 */
export async function promptProjectName() {
  console.log(
    chalk.yellow("📝 Interactive mode - Let's create your project!\n")
  )

  const nameAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '📁 What is your project name?',
      default: 'my-express-app',
      validate: (input) => {
        const errors = validateProjectName(input)
        if (errors.length > 0) {
          return errors[0]
        }
        return true
      },
    },
  ])
  return nameAnswer.projectName
}

/**
 * Future: Prompt for template selection (when we have more)
 */
export async function promptTemplate() {
  // For now only basic, but prepared for expansion
  return 'basic'
}

/**
 * Future: Prompt for additional features
 */
export async function promptFeatures() {
  // Prepared for CORS, validation, auth, etc.
  return []
}
