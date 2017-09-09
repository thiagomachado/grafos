/**
 * Syntax
 * node <this_file_path> <data_structure_type> <graph_file_path> <origin_vertex>
*/

// load parameters
var dataStructureType = process.argv[2];
var graphFilePath     = process.argv[3];
var origin            = process.argv[4];

// dependencies
fs = require('fs');

fileDestination = 'dfs.txt';

// validations
if (!graphFilePath) {
  throw new Error('Missing graphFilePath parameter');
}
if (!dataStructureType) {
  throw new Error('Missing dataStructureType parameter');
}
if (!origin) {
  throw new Error('Missing origin parameter');
}

fs.readFile(graphFilePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  data = data.split('\n');

  var graphModule = require('../libNode/graph.js');
  var graph = new graphModule.Graph(data, dataStructureType);

  graph.dfs(origin);

  // writing the file
  text = '';
  for (var i = 1; i < graph.fathers.length; i++) {
    text += i + ' ' + graph.fathers[i] + '\n';
  }
  fs.writeFile(fileDestination, text, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});
