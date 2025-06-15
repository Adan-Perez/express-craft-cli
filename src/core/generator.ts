import fs from 'fs-extra'
import { join } from 'path'
import type {
  CLIOptions,
  GeneratedPackageJson,
  DependencyVersions,
} from '../types/index.js'
import { getDependencies } from '../utils/helpers.js'

/**
 * Create basic project with TypeScript-enhanced structure
 */
export async function createBasicProject(
  projectPath: string,
  name: string,
  options: CLIOptions
): Promise<void> {
  // Create base directory
  await fs.ensureDir(projectPath)

  // Get dependencies based on chosen strategy
  const deps = await getDependencies(options, options.fetchVersions)

  // Create project files
  await createPackageJson(projectPath, name, deps, options)
  await createAppJs(projectPath, name, options)
  await createReadme(projectPath, name, options)
}

/**
 * Create package.json with proper typing
 */
async function createPackageJson(
  projectPath: string,
  name: string,
  deps: DependencyVersions,
  options: CLIOptions = {}
): Promise<void> {
  const includeNodemon = options.nodemon !== false

  const packageJson: GeneratedPackageJson = {
    name: name,
    version: '1.0.0',
    description: `Express.js application created with Express Craft CLI`,
    type: 'module',
    main: 'app.js',
    scripts: {
      start: 'node app.js',
      dev: includeNodemon ? 'nodemon app.js' : 'node --watch app.js',
    },
    dependencies: {
      express: deps.express,
    },
  }

  // Add nodemon only if not disabled
  if (includeNodemon) {
    packageJson.devDependencies = {
      nodemon: deps.nodemon,
    }
  }

  await fs.writeFile(
    join(projectPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )
}

/**
 * Create app.js with template string typing
 */
async function createAppJs(
  projectPath: string,
  name: string,
  options: CLIOptions = {}
): Promise<void> {
  const appContent = `import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ 
    message: \`Hello from ${name}!\`,
    status: 'working'
  })
})

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`)
})
`

  await fs.writeFile(join(projectPath, 'app.js'), appContent)
}

/**
 * Create README.md with proper content typing
 */
async function createReadme(
  projectPath: string,
  name: string,
  options: CLIOptions = {}
): Promise<void> {
  const includeNodemon = options.nodemon !== false
  const devScript = includeNodemon
    ? 'Start the development server with nodemon'
    : 'Start the development server with Node.js --watch'

  const readmeContent = `# ${name}

Simple Express.js application created with Express Craft CLI.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit: http://localhost:3000

## Available Scripts

- \`npm start\` - Start the production server
- \`npm run dev\` - ${devScript}

## API Endpoints

- \`GET /\` - Welcome message

---

Generated with ❤️ by Express Craft CLI
`

  await fs.writeFile(join(projectPath, 'README.md'), readmeContent)
}
