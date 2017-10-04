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

  var graphModule = require('../libNode/graph.js');
  var graph = new graphModule.Graph(data, dataStructureType);

  var origins = [1, 2, 3, 4, 5];
  var vertices = [10, 20, 30, 40, 50];

  text = '';
  for (var i = 0; i < origins.length; i++) {
    graph.prepareForSearch();
    graph.bfs(origins[i]);
    for (var j = 0; j < vertices.length; j++) {
      text += graph.parents[vertices[j]] + ' ';
    }
  }
  console.log(text);

  text = '';
  for (var i = 0; i < origins.length; i++) {
    graph.prepareForSearch();
    graph.dfs(origins[i]);
    for (var j = 0; j < vertices.length; j++) {
      text += graph.parents[vertices[j]] + ' ';
    }
  }
  console.log(text);
});
