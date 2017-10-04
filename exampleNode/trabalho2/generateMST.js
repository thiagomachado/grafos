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
  console.log();
  var cost = 0;
  var maxDegrees = [0,0,0]; 
  for(i = 1; i < graph.minTree.length; i++)
  {
    var degree =  graph.minTree[i].degree;
    cost = cost + graph.minTree[i][1];
    if(maxDegrees[0]< degree)
    {
      maxDegrees[0] = degree;
    }
    else
    {
      if(maxDegrees[1]< degree)
      {
        maxDegrees[1] = degree;
      }
      else
      {
        if(maxDegrees[2]< degree)
        {
          maxDegrees[2] = degree;
        }
      }
    }
   
  } 
  console.log("total:" + cost);
  console.log("max degrees:" + maxDegrees);
  //console.log("vizinhos Dijikstra: "+graph.minTree[2722].neighbors);
  //console.log("vizinhos Figueiredo: "+graph.minTree[343930].neighbors);
});
