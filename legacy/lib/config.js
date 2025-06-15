/**
 * Dependency strategies for different project requirements
 * These are fallback/offline versions. For up-to-date versions,
 * use getDynamicDependencyStrategies() from version-resolver.js
 */
export const DEPENDENCY_STRATEGIES = {
  stable: {
    express: '^4.18.0', // Tested and stable version (fallback)
    nodemon: '^3.0.0', // Stable nodemon version (fallback)
  },
  latest: {
    express: 'latest', // Always latest version
    nodemon: 'latest', // Always latest version
  },
  experimental: {
    express: 'latest', // Always latest version
    nodemon: 'latest', // Always latest version
  },
}

/**
 * Available templates (prepared for future expansion)
 */
export const TEMPLATES = {
  basic: {
    name: 'Basic',
    description: 'Simple Express server with minimal setup',
    dependencies: ['express'],
    devDependencies: ['nodemon'],
  },
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG = {
  template: 'basic',
  strategy: 'stable',
  port: 3000,
}
