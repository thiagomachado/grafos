class WeightedGraph
{
  constructor(file, type)
  {
    this.load = false;

    if(this.type == 0)
    {
      this.loadGraphAsMatrix(file);
    }

    if (this.type == 1)
    {
      this.loadGraphAsList(file);
    }
  }

  loadGraphAsMatrix(file)
  {
    console.time('loadMatrix');
    var nVertex = parseInt(file[0]);

    this.nVertex = nVertex;
    this.nEdges = nVertex * (nVertex - 1)/2;
    this.matrix = new Array(nVertex + 1);

    for (var i = 1; i < this.matrix.length; i++)
    {
      this.matrix[i] = new Array(nVertex + 1);
    }

    for (var iVertex = 1; iVertex <= this.nVertex; iVertex++)
    {
      var vertex = {};
      var coordenates = file[iVertex].split(" ");
      vertex.coordenateX = parseInt(coordenates[0]);
      vertex.coordenateY = parseInt(coordenates[1]);
      for( var iNextVertex = iVertex + 1; iNextVertex < this.nVertex; iNextVertex++)
      {
        var nextVertex = {};
        var coordenatesNextVertex = file[iNextVertex].split(" ");
        nextVertex.coordenateX = parseInt(coordenates[0]);
        nextVertex.coordenateY = parseInt(coordenates[1]);

        var distance = getDistance(vertex, nextVertex);
        this.matrix[iVertex][iNextVertex] = distance;
        this.matrix[iNextVertex][iVertex] = distance;
      }
    }
    console.timeEnd('loadMatrix');
  }

  getDistance(vertex, nextVertex)
  {
    // right-angled triangle
    return Math.sqrt(
      (vertex.coordenateX - nextVertex.coordenateX)**2
      + (vertex.coordenateY - nextVertex.coordenateY)**2
    );
  }
}

exports.EuclideanGraph = EuclideanGraph;
