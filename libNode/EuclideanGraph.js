class EuclideanGraph
{
  constructor(file)
  {
    this.load = false;
    this.loadGraphAsMatrix(file);
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
      for( var iNextVertex = iVertex; iNextVertex <= this.nVertex; iNextVertex++)
      {
        var nextVertex = {};
        var coordenatesNextVertex = file[iNextVertex].split(" ");
        nextVertex.coordenateX = parseInt(coordenatesNextVertex[0]);
        nextVertex.coordenateY = parseInt(coordenatesNextVertex[1]);

        var distance = this.getDistance(vertex, nextVertex);
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
      Math.pow(vertex.coordenateX - nextVertex.coordenateX, 2)
      + Math.pow(vertex.coordenateY - nextVertex.coordenateY, 2)
    );
  }

  getNearestNeighborCycle()
  {
    var markedArr = Array(this.nVertex + 1);
    var predecessorArr = Array(this.nVertex + 1);

    var randomOrigin = 1;
    markedArr[randomOrigin] = true;

    var previousVertex = randomOrigin;
    var curVertex;
    for (var i = 1; i < this.nVertex; i++) {
      curVertex = this.getNearestUnmarkedNeighbor(previousVertex, markedArr);
      predecessorArr[curVertex] = previousVertex;
      markedArr[parseInt(curVertex)] = true;
      previousVertex = curVertex;
    }
    predecessorArr[randomOrigin] = previousVertex;
    return predecessorArr;
  }

  getNearestUnmarkedNeighbor(v, markedArr)
  {
    var u = null;
    var distU = Infinity;
    for (var i = 1; i < this.matrix.length; i++) {
      if(markedArr[i]) continue;

      if (this.matrix[v][i] < distU) {
        u = i;
        distU = this.matrix[v][i];
      }
    }
    return u;
  }

  get2Opt(path)
  {
    for(i = 0; i < path.length - 2; i++)
    {
        for(j = i + 2; j < path.length; j ++)
        {
          originalEdgesCost = this.matrix[path[i]][path[i + 1]] + this.matrix[path[j]][path[j + 1]];
          candidateEdgesCost = this.matrix[path[i]][path[j]] + this.matrix[path[i + 1]][path[j + 1]];
          if(candidateEdgesCost < originalEdgesCost)
          {
            //invert and change
          }  
        }
    }
  }
}

exports.EuclideanGraph = EuclideanGraph;
