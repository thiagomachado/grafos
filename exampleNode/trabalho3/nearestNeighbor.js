/**
 * Syntax
 * node <this_file_path> <graph_file_path>
*/

// load parameters
var graphFilePath = process.argv[2];

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

  var graphModule = require('../../libNode/EuclideanGraph.js');
  var graph = new graphModule.EuclideanGraph(data);
  var nearestNeighborCycle = graph.getNearestNeighborCycle();
  console.log(nearestNeighborCycle.join(' '));
});
