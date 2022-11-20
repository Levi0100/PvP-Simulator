const { rmSync, existsSync } = require('fs')
const { resolve } = require('path')
const { execSync } = require('child_process')
const pathDist = resolve(__dirname, 'dist')

const init = async () => {
  if (existsSync(pathDist)) rmSync(pathDist, { recursive: true })
  console.log('Building...')
  execSync('npm start')

  require('./dist/core')
}

init()