import { spawn } from 'child_process'
import chalk from 'chalk'

/**
 * Execute npm install with enhanced error handling
 */
export function runNpmInstall(projectPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Better npm command detection on Windows
    const isWindows = process.platform === 'win32'
    const command = isWindows ? 'npm.cmd' : 'npm'

    console.log(
      chalk.gray(`\n🔧 Running: ${command} install in ${projectPath}`)
    )

    const npmProcess = spawn(command, ['install'], {
      cwd: projectPath,
      stdio: 'inherit', // Show output in real time
      shell: isWindows, // Use shell for Windows
    })

    npmProcess.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`npm install failed with exit code ${code}`))
      }
    })

    npmProcess.on('error', (err) => {
      reject(err)
    })
  })
}
