import * as fs from 'fs'
import * as path from 'path'

export const mkDir = pathDir => {
  const fullPath = path.resolve(__dirname, pathDir)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
  }
  return fullPath
}