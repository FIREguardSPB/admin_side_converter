const getQtyNotes = require("../utils/getQty.js");
module.exports = async function getQty (req, res){
  try{
    const qtyNotes  = await getQtyNotes()
    console.log(qtyNotes, '<=================Отдача количества перенесенных записей')
    res.status(200).json(qtyNotes)
  }
  catch (e) {
    res.status(500).json({e})
  }
}