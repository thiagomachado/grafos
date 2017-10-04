/**
 * Syntax
 * node <this_file_path> <data_structure_type> <graph_file_path>
*/

// load parameters
var dataStructureType = process.argv[2];
var graphFilePath     = process.argv[3];

// dependencies
fs = require('fs');

fileDestination = 'bfs.txt';

// validations
if (!graphFilePath) {
  throw new Error('Missing graphFilePath parameter');
}
if (!dataStructureType) {
  throw new Error('Missing dataStructureType parameter');
}

fs.readFile(graphFilePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  data = data.split('\n');

  var graphModule = require('../libNode/graph.js');
  var graph = new graphModule.Graph(data, dataStructureType);

  var origins = [1, 21, 66, 836, 1390, 2207, 3121, 3319, 3888, 27580]

  for (var i = 0; i < origins.length; i++) {
    var start = new Date().getTime();
    graph.prepareForSearch();
    graph.bfs(origins[i]);
    var end = new Date().getTime();
    console.log(end - start);
  }
});
