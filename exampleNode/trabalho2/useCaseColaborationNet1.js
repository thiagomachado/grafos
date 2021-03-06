/**
 * Syntax
 * node <this_file_path>
*/

var origin = 10;

// dependencies
fs = require('fs');

graphFile = 'graphs/rede_colaboracao.txt';
namesFile = 'graphs/rede_colaboracao_vertices.txt';

var names;

var origin = {
  vertex: Infinity,
  name: 'Edsger W. Dijkstra'
};

var destinations = [
  {
    vertex: Infinity,
    name: 'Alan M. Turing',
  },
  {
    vertex: Infinity,
    name: 'J. B. Kruskal',
  },
  {
    vertex: Infinity,
    name: 'Jon M. Kleinberg',
  },
  {
    vertex: Infinity,
    name: 'Éva Tardos',
  },
  {
    vertex: Infinity,
    name: 'Daniel R. Figueiredo',
  }
];

fs.readFile(namesFile, 'utf8', function (err,data) {
  data = data.split('\n');
  nVertex = data.length - 1;
  names = new Array(nVertex);
  for (var i = 0; i < nVertex; i++) {
    [vertex, name] = data[i].split(',');
    names[vertex] = name;

    for (var j = destinations.length - 1; j >= 0; j--) {
      if(destinations[j].name == name){
        destinations[j].vertex = vertex;
      }
    }
    if(origin.name == name)
    {
      origin.vertex = vertex;
    }
  }

  fs.readFile(graphFile, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    data = data.split('\n');

    var graphModule = require('../../libNode/weightedGraph.js');
    var graph = new graphModule.WeightedGraph(data);

    vertices = graph.search(origin.vertex);

    const NAME_PROP = 0;
    const DISTANCE_PROP = 1;
    const CONNECTED_BY_PROP = 2;
    /*Prints path between Dijkstra and others */
    for (var i = destinations.length - 1; i >= 0; i--) {
      console.log('\n\n\n');
      console.log('Path Distance ' + vertices[destinations[i].vertex][DISTANCE_PROP]);
      curVertex = destinations[i].vertex;
      path = []
      while (curVertex)
      {
        path.push(names[vertices[curVertex][NAME_PROP]]);
        curVertex = vertices[curVertex][CONNECTED_BY_PROP];
      }
      path.reverse();
      console.log('Path ' + path.join(', '));
    }
  });

});
