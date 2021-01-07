const fs = require('fs')

const rootPack = require('../package.json')
const packPath = require.resolve('../dist/package.json')
const pack = require(packPath)

pack.version = rootPack.version
delete pack.private;

fs.writeFileSync(packPath, JSON.stringify(pack, null, 2))
const path = require('path')

distCopy('CHANGELOG.md')
distCopy('README.md')
distCopy('LICENSE')

console.log('\x1b[33m[stripe-angular]:\x1b[0m', 'updated dist package version to ', pack.version)


function distCopy(fileName){
  const fromReadMe = path.join(packPath,'../../', fileName)
  const toReadMe = path.join(packPath,'../', fileName)
  fs.writeFileSync(toReadMe, fs.readFileSync(fromReadMe))
}
