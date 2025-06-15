/**
 * Dynamic dependency version resolver
 * Fetches current stable and latest versions from npm registry
 */

import https from 'https'
import type { DependencyVersions, DependencyStrategy } from '../types/index.js'

/**
 * Package information from npm registry
 */
interface PackageInfo {
  'dist-tags': {
    latest: string
    [key: string]: string
  }
  versions: Record<string, any>
}

/**
 * Fetch package info from npm registry
 */
function fetchPackageInfo(packageName: string): Promise<PackageInfo> {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/${packageName}`

    // Set timeout for HTTP request (10 seconds)
    const timeout = setTimeout(() => {
      reject(new Error(`Request timeout for ${packageName} after 10 seconds`))
    }, 10000)

    const request = https
      .get(url, (res) => {
        clearTimeout(timeout)
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          try {
            const packageInfo = JSON.parse(data) as PackageInfo
            resolve(packageInfo)
          } catch (error) {
            reject(
              new Error(
                `Failed to parse package info for ${packageName}: ${
                  error instanceof Error ? error.message : 'Unknown error'
                }`
              )
            )
          }
        })
      })
      .on('error', (error) => {
        clearTimeout(timeout)
        reject(
          new Error(
            `Failed to fetch package info for ${packageName}: ${error.message}`
          )
        )
      })

    // Set timeout for the request itself
    request.setTimeout(10000, () => {
      request.destroy()
      reject(new Error(`Request timeout for ${packageName} after 10 seconds`))
    })
  })
}

/**
 * Get the latest stable version of a package
 */
export async function getStableVersion(packageName: string): Promise<string> {
  try {
    const packageInfo = await fetchPackageInfo(packageName)
    const latestVersion = packageInfo['dist-tags']?.latest

    if (!latestVersion) {
      throw new Error(`No latest version found for ${packageName}`)
    }

    // Return with caret for compatible updates
    return `^${latestVersion}`
  } catch (error) {
    console.warn(
      `Warning: Could not fetch version for ${packageName}, using fallback`
    )

    // Fallback versions (our current hardcoded ones)
    const fallbacks: Record<string, string> = {
      express: '^4.18.0',
      nodemon: '^3.0.0',
    }

    return fallbacks[packageName] || 'latest'
  }
}

/**
 * Get dynamic dependency strategies
 */
export async function getDynamicDependencyStrategies(): Promise<
  Record<DependencyStrategy, DependencyVersions>
> {
  try {
    // Fetch current versions
    const [expressStable, nodemonStable] = await Promise.all([
      getStableVersion('express'),
      getStableVersion('nodemon'),
    ])

    return {
      stable: {
        express: expressStable,
        nodemon: nodemonStable,
      },
      latest: {
        express: 'latest',
        nodemon: 'latest',
      },
      experimental: {
        express: 'latest',
        nodemon: 'latest',
      },
    }
  } catch (error) {
    console.warn('Warning: Using fallback dependency versions')

    // Return our current hardcoded versions as fallback
    return {
      stable: {
        express: '^4.18.0',
        nodemon: '^3.0.0',
      },
      latest: {
        express: 'latest',
        nodemon: 'latest',
      },
      experimental: {
        express: 'latest',
        nodemon: 'latest',
      },
    }
  }
}
