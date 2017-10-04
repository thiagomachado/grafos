var heapModule = require('./binaryHeap.js');
const DISTANCE_PROP = 1;
const COST_PROP = DISTANCE_PROP;
const CONNECTED_BY_PROP = 2;

class WeightedGraph
{
  constructor(file)
  {
    this.load = false;

    this.loadGraphAsList(file);
  }

  loadGraphAsList(file)
  {
    console.time('loadList');

    var nVertex = parseFloat(file[0]);

    this.nVertex = nVertex;
    this.nEdges = file.length - 2;
    this.degrees = new Array(nVertex + 1);
    this.averageDegree = (2 * this.nEdges)/this.nVertex;
    this.list = new Array(nVertex + 1);

    for (var i = 1; i < nVertex + 1; i++) {
      this.list[i] = new Array();
    }

    for (var i = 1; i <= this.nEdges; i++)
    {
      var vertex = file[i].split(" ");
      var vertex0 = parseFloat(vertex[0]);
      var vertex1 = parseFloat(vertex[1]);
      var weight = parseFloat(vertex[2]);

      if (weight < 0) {
        throw new Error('Not supported negative weight in edge ' + file[i]);
      }

      this.list[vertex0].push([vertex1, weight]);
      this.list[vertex1].push([vertex0, weight]);

      //for each edge, add 1 on deegre of each vertex of this edge
      if(typeof   this.degrees[vertex0] == "undefined")
      {
        this.degrees[vertex0] = 1;
      }
      else
      {
        this.degrees[vertex0]++;
      }
      if(typeof   this.degrees[vertex1] == "undefined")
      {
        this.degrees[vertex1] = 1;
      }
      else
      {
        this.degrees[vertex1]++;
      }
    }
    console.timeEnd('loadList');
  }

  /**
   * search by dijkstra
   *
   * return array of [index of this vertex, distance from origin, vertex connecting this one, position in heap ]
   */
  search(origin)
  {
    var vertices = new Array(this.nVertex + 1);

    var heap = new heapModule.BinaryHeap(function(a) {
      return a[DISTANCE_PROP];
    });

    var infiniteDistance = Infinity;

    var vertex;
    for (var i = 1, limit = vertices.length; i < limit; i++) {
      vertex = [i, infiniteDistance, null, null];
      vertices[i] = vertex;
      heap.push(vertex);
    }
    vertices[origin][DISTANCE_PROP] = 0;

    // format of heap's items: [index, distance]
    heap.bubbleUpItem(vertices[origin]);

    var u;
    var v;
    var uDistance;
    var vWeight;
    var neighbors;
    var connectedBy;
    var position;
    while(heap.size() != 0)
    {
      [u, uDistance, connectedBy, position] = heap.pop();

      neighbors = this.list[u];

      for (var i = 0, iLimit = neighbors.length; i < iLimit; i++) {
        [v, vWeight] = neighbors[i];

        if(vertices[v][DISTANCE_PROP] > vertices[u][DISTANCE_PROP] + vWeight)
        {
          vertices[v][DISTANCE_PROP] = vertices[u][DISTANCE_PROP] + vWeight;
          vertices[v][CONNECTED_BY_PROP] = u;

          heap.bubbleUpItem(vertices[v]);
        }
      }
    }
    return vertices;
  }

  mst()
  {
    var graph = this.list;
    this.minTree = new Array(this.nVertex + 1);

    var heap = new heapModule.BinaryHeap(function(a) {
      return a[DISTANCE_PROP];
    });

    //define all vertex with null father and infinity cost
    var vertex;
    for (var i = 1; i < this.minTree.length; i++)
    {
      vertex = {};
      vertex.index = i;
      vertex[COST_PROP] = Infinity;
      vertex.father = null; 
      vertex.connected = false;      
      vertex.neighbors = [];
      vertex.degree = 0;          
      this.minTree[i] = vertex;
      heap.push(vertex);
     
    }

    //define origin   
    var origin = Math.floor((Math.random() * this.nVertex) + 1 );
    //console.log(origin);
    //set 0 for the cost of origin
    this.minTree[origin][COST_PROP] = 0;
    this.minTree[origin].degree = -1;
    //put the minimum cost in the root of heap
    heap.bubbleUpItem( this.minTree[origin]);

    var uVertex = {}
    var uNeighbors;
    var vIndex;
    var vCost;
    while(heap.size() != 0)
    {
      uVertex = heap.pop();
      uVertex.degree ++;
      if(uVertex.father != null)
      {
        this.minTree[uVertex.father].degree ++; 
      }
      uVertex.connected = true;
      uNeighbors = graph[uVertex.index];
      for(i = 0; i <uNeighbors.length; i++)
      {
        [vIndex, vCost] = uNeighbors[i];
        var neighbor = this.minTree[vIndex];
        if(neighbor[COST_PROP] > vCost && !neighbor.connected )
        {   
          if(heap.size() !=0)
          {       
            this.minTree[vIndex].father = uVertex.index;
            this.minTree[vIndex][COST_PROP] = vCost;
            
            if(this.minTree[vIndex].index != uVertex.father)
            {
              this.minTree[vIndex].neighbors.push(uVertex.index);
              uVertex.neighbors.push(vIndex);
                heap.bubbleUpItem( this.minTree[vIndex]);
            }
            else
            {                            
              var index = this.minTree[vIndex].neighbors.indexof(uVertex.index);
              this.minTree[vIndex].neighbors.splice(index,1);
              var uIndex =uVertex.neighbors.indexof(vIndex);
              uVertex.neighbors.splice(uIndex,1);
            }
          }
        }
      }
    }

  }

  writeMSTInFile()
  {

  }
}

exports.WeightedGraph = WeightedGraph;
