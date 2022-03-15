
//polyfill for replaceAll because node 10 is not supported it
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(str, newStr){
    
    // If a regex pattern
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }
    
    // If a string
    return this.replace(new RegExp(str, 'g'), newStr);
    
  };
}

module.exports = function cutterSymbols (name) {
  return name.replaceAll(new RegExp(/[^ a-zа-яё\d]+/gm), '')
}