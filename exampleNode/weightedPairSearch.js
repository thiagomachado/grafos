/**
 * Syntax
 * node <this_file_path> <graph_file_path> <origin>, <end>
*/

// load parameters
var graphFilePath = process.argv[2];
var origin = process.argv[3];
var end = process.argv[4];

// dependencies
fs = require('fs');

// validations
if (!graphFilePath) {
  throw new Error('Missing graphFilePath parameter');
}
if (!origin) {
  throw new Error('Missing origin parameter');
}

if (!end) {
  throw new Error('Missing end parameter');
}

fs.readFile(graphFilePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  data = data.split('\n');

  var graphModule = require('../libNode/weightedGraph.js');
  var graph = new graphModule.WeightedGraph(data);
  console.time('search');
  var vertices = graph.search(origin);
  console.timeEnd('search');

  console.log('Distance ' + vertices[end][1]);
  var path = [], curVertex = end;
  while (curVertex)
  {
    path.push(vertices[curVertex][0]);
    curVertex = vertices[curVertex][2];
  }
  path.reverse();
  console.log('Path ' + path);
});
