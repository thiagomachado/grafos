/**
 * Syntax
 * node <this_file_path> <data_structure_type> <graph_file_path>
*/

// load parameters
var dataStructureType = process.argv[2];
var graphFilePath     = process.argv[3];

// dependencies
fs = require('fs');

fileDestination = 'connectedComponents.txt';

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

  var graphModule = require('../../libNode/graph.js');
  var graph = new graphModule.Graph(data, dataStructureType);

  console.time("connectedComponents");
  graph.genConnectedComponents();
  console.timeEnd("connectedComponents");

  graph.connectedComponents.sort(function(a, b){
    return b.length - a.length;
  });

  // writing the file
  text = '';
  for (var i = 0, iLimit = graph.connectedComponents.length; i < iLimit; i++) {
    connectedComponent = graph.connectedComponents[i];
    text += connectedComponent.length + ': ';
    for (var j = 0, jLimit = connectedComponent.length; j < jLimit; j++) {
        text += connectedComponent[j] + ' ';
    }
    text += '\n';
  }

  fs.writeFile(fileDestination, text, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});
