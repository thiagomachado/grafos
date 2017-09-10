class Graph
{
  constructor(file, type)
  {
    this.type = type;
    this.load = false;

    if(this.type == 0)
    {
      this.loadGraphFromFileAsMatrix(file);
    }

    if (this.type == 1)
    {
      this.loadGraphFromFileAsList(file);
    }

    this.prepareForSearch();
  }

  loadGraphFromFileAsList(file)
  {
    console.time('loadList');

    var nVertex = parseInt(file[0]);

    this.nVertex = nVertex;
    this.nEdges = file.length - 2;
    this.degrees = new Array(nVertex + 1);
    this.averageDegree = (2 * this.nEdges)/this.nVertex;
    this.list = new Array(nVertex + 1);

    for (var i = 1; i <= this.nEdges; i++)
    {
      var vertex = file[i].split(" ");
      var vertex0 = parseInt(vertex[0]);
      var vertex1 = parseInt(vertex[1]);
      if(typeof this.list[vertex0] == "undefined")
      {
        this.list[vertex0] = new Array();
      }
      if(typeof this.list[vertex1] == "undefined")
      {
        this.list[vertex1] = new Array();
      }
      this.list[vertex0].push(vertex1);
      this.list[vertex1].push(vertex0);

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

  loadGraphFromFileAsMatrix(file)
  {
    console.time('loadMatrix');

    var nVertex = parseInt(file[0]);

    this.nVertex = nVertex;
    this.nEdges = file.length - 2;
    this.degrees = new Array(nVertex + 1);
    this.averageDegree = (2 * this.nEdges)/this.nVertex;
    this.matrix = new Array(nVertex + 1);

    for (var i = 1; i < this.matrix.length; i++)
    {
      this.matrix[i] = new Array(nVertex + 1);
    }

    for (var i = 1; i <= this.nEdges; i++)
    {
      var vertex = file[i].split(" ");
      var vertex0 = parseInt(vertex[0]);
      var vertex1 = parseInt(vertex[1]);

       this.matrix[vertex0][vertex1] = 1;
       this.matrix[vertex1][vertex0] = 1;

       //for each edge, add 1 on deegre of each vertex of this edge
       if(typeof this.degrees[vertex0] == "undefined")
       {
         this.degrees[vertex0] = 1;
       }
       else
       {
         this.degrees[vertex0]++;
       }
       if(typeof this.degrees[vertex1] == "undefined")
       {
         this.degrees[vertex1] = 1;
       }
       else
       {
         this.degrees[vertex1]++;
       }
    }
    console.timeEnd('loadMatrix');
  }

  /**
   * Computes the degree frequency
   */
  genDegreeFrequency()
  {
    // degree frequency should be a flexible size hashtable,
    // since the degree frequency is sparse
    this.degreeFrequency = new Array();
    for (var i = 1; i < this.degrees.length; i++)
    {
      var degreeOfIvertex = this.degrees[i];
      if (typeof this.degrees[i] == "undefined")
      {
        degreeOfIvertex = 0;
      }

      if(typeof this.degreeFrequency[degreeOfIvertex] == "undefined")
      {
        this.degreeFrequency[degreeOfIvertex] = 1;
      }
      else
      {
        this.degreeFrequency[degreeOfIvertex]++;
      }
    }
  }

  search(type, origin)
  {
    if(type == 0)
    {
      this.bfs(origin);
    }

    if (type == 1)
    {
      this.dfs(origin);
    }
  }

  bfs(origin)
  {
    origin = parseInt(origin);
    var queue = [];
    var neighbors = [];
    var graph = [];

    this.layer[origin] = 0;
    this.mark[origin] = true;
    queue.push(origin);

    if(this.type == 0)
    {
      graph = this.matrix;
    }
    if(this.type == 1)
    {
      graph = this.list;
    }

    // workaround to support getting the first element of queue
    // array.shift moves the entire array around in order to reindex it
    var curQueueStart = 0;
    while (queue.length > curQueueStart)
    {
      var selectedVertex = queue[curQueueStart];
      // removes element from queue
      curQueueStart++;

      if( undefined == graph[selectedVertex])
      {
        graph[selectedVertex] = [];
      }
      neighbors = graph[selectedVertex];

      for (var i=0; i < neighbors.length;i++)
      {
        if(typeof neighbors[i] != "undefined")
        {
          if (this.type == 0)
          {
            if (this.mark[i] != true)
            {
              this.mark[i] = true;
              queue.push(i);
              this.fathers[i] = selectedVertex;
              this.layer[i] = this.layer[selectedVertex] + 1;
            }
          }
          else
          {
            if (this.mark[neighbors[i]] != true)
            {
              this.mark[neighbors[i]] = true;
              queue.push(neighbors[i]);
              this.fathers[neighbors[i]] = selectedVertex;
              this.layer[neighbors[i]] = this.layer[selectedVertex] + 1;
            }
          }
        }
      }
    }
  }

  prepareForSearch()
  {
    this.mark       = new Array(this.nVertex + 1);
    this.discovered = new Array(this.nVertex + 1);
    this.layer = new Array(this.nVertex + 1);
    this.fathers    = new Array(this.nVertex + 1);
  }

  dfs(origin)
  {
    origin = parseInt(origin);
    var stack = [];
    var graph = [];

    // counts also the origin as a discovered vertex
    this.nDiscoveredVertices++;

    stack.push(origin);
    this.discovered[origin] = true;

    if(this.type == 0)
    {
      graph = this.matrix;
    }
    if(this.type == 1)
    {
      graph = this.list;
    }

    while (stack.length > 0)
    {
      var selectedVertex = stack.pop();
      if( undefined == graph[selectedVertex])
      {
        graph[selectedVertex] = [];
      }

      var neighbors = graph[selectedVertex];
      this.mark[selectedVertex]=true;
      for (var i=0; i< neighbors.length; i++)
      {
        if(this.type == 0)
        {
          if(typeof neighbors[i] != "undefined")
          {
            if (this.mark[i]!=true)
            {
              stack.push(i);
              if(this.discovered[i] != true)
              {
                this.discovered[i] = true;
                this.nDiscoveredVertices++;
                this.fathers[i] = selectedVertex;
              }
            }
          }
        }
        else
        {
          if (this.mark[neighbors[i]]!=true)
          {
            stack.push(neighbors[i]);
            if(this.discovered[neighbors[i]] != true)
            {
              this.discovered[neighbors[i]] = true;
              this.nDiscoveredVertices++;
              this.fathers[neighbors[i]] = selectedVertex;
            }
          }
        }
      }
    }
  }

  genConnectedComponents()
  {
    this.connectedComponents = [];
    for (var i = 1; i <= this.nVertex; i++)
    {
      if(typeof this.discovered[i] == "undefined")
      {

        this.mark = [];
        this.nDiscoveredVertices = 0;

        this.dfs(i);
        this.connectedComponents[this.connectedComponents.length] = {
          'size':      this.nDiscoveredVertices,
          'vertices':  this.mark
        };
      }
    }
  }
}

exports.Graph = Graph;
