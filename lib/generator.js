import fs from 'fs-extra'
import { join } from 'path'
import { getDependencies } from './utils.js'

/**
 * Create basic project
 */
export async function createBasicProject(projectPath, name, options) {
  // Create base directory
  await fs.ensureDir(projectPath)

  // Get dependencies based on chosen strategy
  // Use dynamic versions if --fetch-versions is specified
  const deps = await getDependencies(options, options.fetchVersions)

  // Create project files
  await createPackageJson(projectPath, name, deps, options)
  await createAppJs(projectPath, name, options)
  await createReadme(projectPath, name, options)
}

/**
 * Create package.json
 */
async function createPackageJson(projectPath, name, deps, options = {}) {
  const includeNodemon = options.nodemon !== false

  const packageJson = {
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
 * Create app.js
 */
async function createAppJs(projectPath, name, options = {}) {
  const appContent = `import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from ${name}!',
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
 * Create README.md
 */
async function createReadme(projectPath, name, options = {}) {
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
