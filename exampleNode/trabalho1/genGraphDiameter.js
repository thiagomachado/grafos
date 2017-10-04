/**
 * Syntax
 * node <this_file_path> <graph_file_path>
*/

// load parameters
var graphFilePath     = process.argv[2];

var dataStructureType = 1;

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

  data = data.split('\n');

  var graphModule = require('../../libNode/graph.js');
  var graph = new graphModule.Graph(data, dataStructureType);

  console.time("diameter");
  graph.calculateDiameter();
  console.timeEnd("diameter");

  console.log(graph.diameter);
});
