/**
 * Syntax
 * node <this_file_path> <data_structure_type> <graph_file_path>
*/

// load parameters
var dataStructureType = process.argv[2];
var graphFilePath     = process.argv[3];

// dependencies
fs = require('fs');

fileDestination = 'graphInfo.txt';

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

  graph.genDegreeFrequency();

  // writing the file
  text = '';

  text += 'Número de vértices: ' + graph.nVertex + '\n';
  text += 'Número de arestas: ' + graph.nEdges + '\n';
  text += 'Grau médio: ' + graph.averageDegree + '\n';
  text += '\n';

  text += 'Distribuição empírica dos graus dos vértices:\n';
  graph.degreeFrequency.forEach(function(degreeFrequency, i) {
    text += i + ': ' + degreeFrequency / graph.nVertex + '\n';
  });

  fs.writeFile(fileDestination, text, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});
