/**
 * Syntax
 * node <this_file_dir>/main.js <graph_file_path>
*/

// load parameters
var dataStructureType = process.argv[2];
var graphFilePath = process.argv[3];

// dependencies
fs = require('fs');

// validations
if (!graphFilePath) {
  throw new Error('Missing graphFilePath parameter');
}

fs.readFile(graphFilePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  console.log(data.length);
});
