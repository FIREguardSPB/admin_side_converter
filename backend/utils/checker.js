// const successFlag = require("./successFlag");
const checkFlag = require('./checkFlag')


const successedfoo = async () => new Promise((resolve) => { const res = checkFlag(); resolve(res)})

successedfoo().then(r => {if (r){return 'База уже конвертирована'} else {startConv()}})
