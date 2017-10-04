/**
 * Syntax
 * node <this_file_path>
*/

var origins = [10, 20, 30, 40, 50];

var destination = 1;
const DISTANCE_PROP = 1;
const CONNECTED_BY_PROP = 2;

// dependencies
fs = require('fs');

var files = [
  'graphs/grafo_1.txt',
  'graphs/grafo_2.txt',
  'graphs/grafo_3.txt',
  'graphs/grafo_4.txt',
  'graphs/grafo_5.txt',
];

for (var i = 0; i < files.length; i++) {
  graphFilePath = files[i];

  fs.readFile(graphFilePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    data = data.split('\n');

    var graphModule = require('../../libNode/weightedGraph.js');
    var graph = new graphModule.WeightedGraph(data);

    var vertices;
    var path;
    for (var j = 0; j < origins.length; j++) {
      origin = origins[j];

      var timeSamples = [];
      for (var k = 0; k < 10; k++) {
        var start = new Date().getTime();
        vertices = graph.search(origin);
        var end = new Date().getTime();
        timeSamples.push(end - start);
      }
      var total = 0;
      for (var k = 0; k < timeSamples.length; k++) {
        total += timeSamples[k];
      }

      path = [], curVertex = destination;
      while (curVertex)
      {
        path.push(curVertex);
        curVertex = vertices[curVertex][CONNECTED_BY_PROP];
      }
      path.reverse();

      console.log(origin + '\t' + (total / timeSamples.length) + '\t' + vertices[destination][DISTANCE_PROP] + '\t' + path.join(', '));
    }
  });
}
