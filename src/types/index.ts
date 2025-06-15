/**
 * CLI command options interface
 */
export interface CLIOptions {
  yes?: boolean
  latest?: boolean
  stable?: boolean
  install?: boolean
  nodemon?: boolean
  fetchVersions?: boolean
}

/**
 * Project configuration interface
 */
export interface ProjectConfig {
  name: string
  path: string
  template: string
  dependencies: DependencyVersions
  includeNodemon: boolean
}

/**
 * Dependency versions for different strategies
 */
export interface DependencyVersions {
  express: string
  nodemon: string
}

/**
 * Available dependency strategies
 */
export type DependencyStrategy = 'stable' | 'latest' | 'experimental'

/**
 * Template configuration
 */
export interface TemplateConfig {
  name: string
  description: string
  dependencies: string[]
  devDependencies: string[]
}

/**
 * Package.json structure for generated projects
 */
export interface GeneratedPackageJson {
  name: string
  version: string
  description: string
  type: string
  main: string
  scripts: Record<string, string>
  dependencies: Record<string, string>
  devDependencies?: Record<string, string>
}

/**
 * Validation error structure
 */
export interface ValidationError {
  field: string
  message: string
}
