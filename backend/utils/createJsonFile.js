const fs = require("fs");
const path = require("path");
const isPkg = process.hasOwnProperty('pkg')
const pkgPath = path.join(process.execPath, '..')
const notPkgPath = path.join(__dirname, '..', '..', '..')
const pathModels = path.join(isPkg ? pkgPath : notPkgPath)
module.exports = async function createJsonFile (data, nameFile) {
  await fs.open(path.join(pathModels, `${nameFile}.json`), 'w', async (err) => {
    if (err) throw err;
    else {
      await fs.writeFile(path.join(pathModels, `${nameFile}.json`), JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been replaced!');
      });
    }
  });
}