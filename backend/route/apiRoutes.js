const Router = require("express");
const converting = require("../controllers/startConvert.js");
const getPrepareInfo = require('../controllers/getInfo.js')
const postPrepareInfo = require('../controllers/checkInfoModels.js')
const getQty = require('../controllers/getQtyNotes.js')
const startServerMongo = require('../utils/startServerMongo.js')
const killServerMongo = require('../controllers/killServerMongo.js')
const createJson = require('../controllers/createJson.js')
const zipfile = require('../controllers/zipfile.js')
const apiRouter = new Router()

//end points
apiRouter
  .get('/convert', converting)
  .get('/prepareInfo', getPrepareInfo)
  .post('/prepareInfo', postPrepareInfo)
  .get('/qtynotes', getQty)
  .get('/startmongo', startServerMongo)
  .get('/killserver', killServerMongo)
  .post('/createjson', createJson)
  .get('/zipfile', zipfile)
  //
  
  module.exports = apiRouter