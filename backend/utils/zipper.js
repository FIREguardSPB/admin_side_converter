const EasyZip = require('easy-zip2').EasyZip;
const zip5 = new EasyZip();
const path = require("path");
const isPkg = process.hasOwnProperty('pkg')
const pkgPath = path.join(process.execPath, '..')
const notPkgPath = path.join(__dirname, '..', '..', '..')
const pathDestinationPkg = path.join(process.execPath, '..', 'dataForClientConvert.vrz')
const pathDestinationNotPkg = path.join(__dirname, '..', '..', '..', 'dataForClientConvert.vrz')
const pathDestination = isPkg ? pathDestinationPkg : pathDestinationNotPkg
const pathZip = path.join(isPkg ? pkgPath : notPkgPath)
const convert_collections = isPkg ? path.join(pkgPath, 'convert_collections.json') : path.join(notPkgPath, 'convert_collections.json')
const convert_data = isPkg ? path.join(pkgPath, 'convert_data.json') : path.join(notPkgPath, 'convert_data.json')
module.exports = function zipper () {
  console.log("zip with Stream");
  const zip7 = new EasyZip();
  console.log(convert_collections)
  const files = [{
    source: convert_collections,
    target: 'convert_collections.json'
  },{
    source: convert_data,
    target: 'convert_data.json'
  }
  ];
  zip7.batchAdd(files, function() {
    zip7.writeToFileStream(pathDestination, function(metadata) {
      console.log(metadata);
    }, function() {
      console.log("stream.zip is finished");
    });
  });
}