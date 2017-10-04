/**
 * Syntax
 * node <this_file_path> <data_structure_type> <graph_file_path>
*/

// load parameters
var graphFilePath     = process.argv[2];

// dependencies
fs = require('fs');

fileDestination = 'connectedComponents.txt';

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
  var graph = new graphModule.Graph(data, 1);

  console.time("connectedComponents");
  graph.genConnectedComponents();
  console.timeEnd("connectedComponents");

  graph.connectedComponents.sort(function(a, b){
    return b.length - a.length;
  });

  console.log(graph.connectedComponents.length);
  console.log(graph.connectedComponents[0].length);
  var smallestComponent = graph.connectedComponents.length-1;
  console.log(graph.connectedComponents[smallestComponent].length);
});
