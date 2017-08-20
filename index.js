var path = require('path')
var context = path.dirname(module.parent.filename)

module.exports = function (uri) {
  var modulePath = path.resolve(context, uri)
  var moduleExports = require(modulePath)

  // clean current required module chache with children
  cleanModulesCache(module)
  return moduleExports
}

// clean self cache for dynamic module.parent
cleanModulesCache(module)

// clean caches recursively
function cleanModulesCache (modules) {
  modules = [].concat(modules)
  modules.forEach(function (module) {
    delete require.cache[module.filename]
    if (module.children.length) {
      cleanModulesCache(module.children)
    }
  })
}