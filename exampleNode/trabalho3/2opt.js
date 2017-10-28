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

  console.time('nearestNeighborCycle');
  var nearestNeighborCycle = graph.getNearestNeighborCycle();
  console.timeEnd('nearestNeighborCycle');

  console.time('2OPT');
  var opt2Cycle = graph.get2Opt(nearestNeighborCycle);
  console.timeEnd('2OPT');

  opt2Cycle.pop(); // removes last element, which is equal to the first

  console.log(opt2Cycle.join(' '));
  console.log('Numero de elementos: ' + opt2Cycle.length);
});
