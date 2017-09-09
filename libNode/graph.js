class Graph
{
  constructor(file, type)
  {
    this.type = type;
    this.load = false;
    this.nConnectedComponents = 0;
    this.maxComponents = 0;
    this.minComponents = 10000000000000;

    if(this.type == 0)
    {
      this.loadGraphFromFileAsMatrix(file);
    }

    if (this.type == 1)
    {
      this.loadGraphFromFileAsList(file);
    }
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

    console.log("finish");
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

    console.log("finish");
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
    console.time('BFS');
    origin = parseInt(origin);
    var queue = [];
    var neighbors = [];
    var graph = [];

    this.mark    = new Array(this.nVertex + 1);
    this.fathers = new Array(this.nVertex + 1);
    this.layer   = new Array(this.nVertex + 1);

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

    while (queue.length > 0)
    {
      var selectedVertex = queue.shift();
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
    console.timeEnd('BFS');
  }

  dfs(origin)
  {
    console.time('DFS');
    origin = parseInt(origin);
    var stack = [];
    var discovered = new Array(this.nVertex + 1);
    var graph = [];

    this.mark    = new Array(this.nVertex + 1);
    this.fathers = new Array(this.nVertex + 1);

    stack.push(origin);

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
              if(discovered[i] != true)
              {
                discovered[i] = true;
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
            if(discovered[neighbors[i]] != true)
            {
              discovered[neighbors[i]] = true;
              this.fathers[neighbors[i]] = selectedVertex;
            }
          }
        }
      }
    }

    console.timeEnd('DFS');
  }

  connectedComponets()
  {
    console.time("connectedComponets");
    var aux = 0;
    for (var i = 1; i <= this.nVertex; i++)
    {
      if(typeof this.mark[i] == "undefined")
      {

        this.nConnectedComponents ++;
        this.dfs(i);
        var nComponents = 0;

        for (var j = 1; j <= this.mark.length; j++)
        {
          if(typeof this.mark[j] != "undefined")
          {
            nComponents ++;
          }
        }
        aux = nComponents - aux;
        if(aux >= this.maxComponents)
        {
          this.maxComponents = aux;
        }
        if(aux <= this.minComponents)
        {
          this.minComponents = aux;
        }
        console.timeEnd("connectedComponets");
      }

    }
    return 0;
  }

}



class WeightedGraph
{
  constructor(file)
  {
    this.load = false;
    this.nConnectedComponents = 0;
    this.maxComponents = 0;
    this.minComponents = 10000000000000;

    this.loadGraphFromFileAsList(file);
  }

  loadGraphFromFileAsList(file)
  {
    console.time('loadList');
    var _this = this;

    var reader = new FileReader();
    reader.onload = function()
    {
      var text = reader.result.split("\n");
      var nVertex = parseInt(text[0]);


      _this.nVertex = nVertex;
      _this.nEdges = text.length - 2;
      _this.degrees = new Array(nVertex + 1);
      _this.averageDegree = (2 * _this.nEdges)/_this.nVertex;
      _this.list = new Array(nVertex + 1);
      _this.mark = new Array(nVertex + 1);

      for (var i = 1; i <= _this.nEdges; i++)
      {
        var line = text[i].split(" ");
        var vertex0 = parseInt(line[0]);
        var vertex1 = parseInt(line[1]);
        var weight = parseInt(line[2]);

        if(typeof _this.list[vertex0] == "undefined")
        {
          _this.list[vertex0] = new Array();
        }
        if(typeof _this.list[vertex1] == "undefined")
        {
          _this.list[vertex1] = new Array();
        }
        _this.list[vertex0].push(vertex1);
        _this.list[vertex1].push(vertex0);

        //for each edge, add 1 on deegre of each vertex of this edge
        if(typeof   _this.degrees[vertex0] == "undefined")
        {
          _this.degrees[vertex0] = 1;
        }
        else
        {
          _this.degrees[vertex0]++;
        }
        if(typeof   _this.degrees[vertex1] == "undefined")
        {
          _this.degrees[vertex1] = 1;
        }
        else
        {
          _this.degrees[vertex1]++;
        }

      }

      //_this.generateDegreeEmpiricalDistribution();

      console.log("finish");
      console.timeEnd('loadList');
    };
    reader.readAsText(file);
  }
}

exports.Graph = Graph;