/**
 * Syntax
 * node <path_to_this_file> <graph_file_path>
*/

var graphPath = process.argv[2];

fs = require('fs')
fs.readFile(graphPath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data.length);
});
