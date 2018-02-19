var fs = require("fs");
const args = require('yargs').argv;


function toCamel(o) {
  var newO, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function(value) {
        if (typeof value === "object") {
          value = toCamel(value)
        }
        return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}


function readFile(file, callback){
  var obj;
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    callback(obj);
  });
}


var input = args.i;
var output = args.o;

if(input != '' && output != ''){
  readFile(input, function(obj){
    var camelFormat = toCamel(obj);
    var json = JSON.stringify(camelFormat);
    fs.writeFile(output, json, 'utf8', function(){
      console.log(output, camelFormat);
    })
  });
}



//console.log(JSON.stringify(toCamel(obj)))
