
const zipper = require('../utils/zipper.js')

module.exports = async function zipfile (req, res) {
  try{
    await zipper()
    res.status(200)
  }
  catch (e) {
    res.status(500).json({e})
  }
  
  
}