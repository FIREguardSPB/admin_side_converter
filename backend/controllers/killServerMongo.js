const processStatus = require("../utils/processStatus");

module.exports = async function killServerMongo(req, res) {
  try{
  const killed = await processStatus('mongod', 'kill')
      res.status(200).json(killed)
    }
    catch (e) {
      res.status(500).json({e})
    }
}