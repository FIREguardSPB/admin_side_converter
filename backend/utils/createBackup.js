const {promises: fs} = require("fs")
const path = require("path")
const pathSource = path.join(process.execPath, '..', '/data', '/mongodb')
module.exports = async function createBackup(pathDestination, flag) {
  console.log(pathSource,"=====>>> Папка базы данных")
  console.log(pathDestination, '====> Папка с бэкапами')
  try {
    if (flag) {
      const dirExist = await new Promise((resolve) => {
        fs.readdir(pathDestination, async (err) => {
          if (!err) resolve(true)
          else {
            resolve(false);
          }
        })
      })
      if (!dirExist) {
        await copyDir(pathSource, pathDestination)
      }
    }
    if (!flag) {
      await copyDir(pathSource, pathDestination)
    }
  } catch (e) {
    console.log(e.message)
  }
}


async function copyDir(pathSource, pathDestination) {
  await fs.mkdir(pathDestination, {recursive: true});
  let entries = await fs.readdir(pathSource, {withFileTypes: true});
  
  for (let entry of entries) {
    let srcPath = path.join(pathSource, entry.name);
    let destPath = path.join(pathDestination, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      try {
        await fs.copyFile(srcPath, destPath)
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}