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

  get2Opt(predecessorArr)
  {

    for(var i = 1; i <= predecessorArr.length - 1; i++)
    {
      var iEdge = this.createEdge(i, predecessorArr[i]);
      for(var j = i + 1; j <= predecessorArr.length - 1; j++)
      {        
        if(iEdge.originVertex != predecessorArr[j] && iEdge.endVertex != predecessorArr[j] && iEdge.endVertex != j)
        {
          var jEdge = this.createEdge(j, predecessorArr[j]);
          var iCandidateEdge = this.createEdge(iEdge.originVertex, jEdge.originVertex);
          var jCandidateEdge = this.createEdge(iEdge.endVertex,jEdge.endVertex);
         
          var originalEdgesCost = iEdge.cost + jEdge.cost;
          var candidateEdgesCost = iCandidateEdge.cost + jCandidateEdge.cost;
          console.log('Arestas Originais:'+iEdge.originVertex+'--'+iEdge.endVertex+'/ /'+jEdge.originVertex+'--'+jEdge.endVertex+'/ /'+originalEdgesCost + ' Arestas Candidatas:'+iCandidateEdge.originVertex+'--'+iCandidateEdge.endVertex+'/ /'+jCandidateEdge.originVertex+'--'+jCandidateEdge.endVertex+'/ /' + candidateEdgesCost);
          
          if(candidateEdgesCost < originalEdgesCost)
          {
            console.log('VAI TROCAR AS ARESTAS ABAIXO');
            console.log('Arestas Originais:'+iEdge.originVertex+'--'+iEdge.endVertex+'/ /'+jEdge.originVertex+'--'+jEdge.endVertex+'/ /'+originalEdgesCost + ' Arestas Candidatas:'+iCandidateEdge.originVertex+'--'+iCandidateEdge.endVertex+'/ /'+jCandidateEdge.originVertex+'--'+jCandidateEdge.endVertex+'/ /' + candidateEdgesCost);

            predecessorArr[iCandidateEdge.originVertex] = iCandidateEdge.endVertex;
            predecessorArr[jCandidateEdge.originVertex] = jCandidateEdge.endVertex;

            //console.log('newPath '+ predecessorArr)
          }
            
        }else
        {
          continue;
        }

      }
    }
    return predecessorArr;
  }

  createEdge(origin, end)
  {
    var edge = {};
    edge.originVertex = origin;
    edge.endVertex = end;
    edge.cost = this.matrix[origin][end];
    return edge;
  }
}

exports.EuclideanGraph = EuclideanGraph;
