module.exports = function namingConverter(name) {
  if (name[name.length - 1] !== 's') {
  return name + 's'
  }
  else return name
}