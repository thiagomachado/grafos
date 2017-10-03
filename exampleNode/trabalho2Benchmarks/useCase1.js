/**
 * Syntax
 * node <this_file_path>
*/

var origin = 10;

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

    var timeSamples = [];
    for (var i = 0; i < 10; i++) {
      var start = new Date().getTime();
      graph.search(origin);
      var end = new Date().getTime();
      timeSamples.push(end - start);
    }
    console.log(timeSamples);
    var total = 0;
    for (var i = 0; i < timeSamples.length; i++) {
      total += timeSamples[i];
    }
    console.log('Mean: ' + total / timeSamples.length);
  });
}
