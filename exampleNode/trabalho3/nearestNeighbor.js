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

  console.time('2opt');
  var opt2 = graph.get2Opt(nearestNeighborCycle);
  console.timeEnd('2opt');

  var curVertex = 1; // random vertex to start listing the path
  var path = [];
  for (var i = 1; i < opt2.length; i++) {
    path.push(curVertex);
    curVertex = opt2[curVertex];
  }
  // for (var i = 1; i < nearestNeighborCycle.length; i++) {
  //   path.push(curVertex);
  //   curVertex = nearestNeighborCycle[curVertex];
  // }
   console.log(path);
});
