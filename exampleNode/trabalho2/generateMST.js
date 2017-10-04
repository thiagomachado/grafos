/**
 * Syntax
 * node <this_file_path> <graph_file_path> <origin>
*/

// load parameters
var graphFilePath = process.argv[2];

// dependencies
fs = require('fs');

// validations
if (!graphFilePath) {
  throw new Error('Missing graphFilePath parameter');
}
// if (!origin) {
//   throw new Error('Missing origin parameter');
// }

fs.readFile(graphFilePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  data = data.split('\n');

  var graphModule = require('../../libNode/weightedGraph.js');
  var graph = new graphModule.WeightedGraph(data);
  console.time("mst");
    graph.mst();
  console.timeEnd("mst");  
  //console.log(graph.minTree);
  
});
