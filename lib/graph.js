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
  }

  loadGraphFromFileAsList(file)
  {
    console.time('loadList');
    this.list = 0;
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

      for (var i = 1; i <= _this.nEdges; i++)
      {
        var vertex = text[i].split(" ");
        var vertex0 = parseInt(vertex[0]);
        var vertex1 = parseInt(vertex[1]);
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

        if(typeof   _this.degrees[vertex0] == "undefined")
        {
          _this.degrees[vertex0] = 1;
        }
        else
        {
          _this.degrees[vertex0] = _this.degrees[vertex0] + 1;
        }
        if(typeof   _this.degrees[vertex1] == "undefined")
        {
          _this.degrees[vertex1] = 1;
        }
        else
        {
          _this.degrees[vertex1] = _this.degrees[vertex1] + 1;
        }

      }
      console.log("finish");
      console.timeEnd('loadList');
      _this.load = true;
    };
    reader.readAsText(file);
  }

  loadGraphFromFileAsMatrix(file)
  {
    console.time('loadMatrix');
    this.matrix = 0;
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
      _this.matrix = new Array(nVertex + 1);

      for (var i = 1; i < _this.matrix.length; i++)
      {
        _this.matrix[i] = new Array(nVertex + 1);
      }

      for (var i = 1; i <= _this.nEdges; i++)
      {
        var vertex = text[i].split(" ");
        var vertex0 = parseInt(vertex[0]);
        var vertex1 = parseInt(vertex[1]);

         _this.matrix[vertex0][vertex1] = 1;
         _this.matrix[vertex1][vertex0] = 1;

         if(typeof   _this.degrees[vertex0] == "undefined")
         {
           _this.degrees[vertex0] = 1;
         }
         else
         {
           _this.degrees[vertex0] = _this.degrees[vertex0] + 1;
         }
         if(typeof   _this.degrees[vertex1] == "undefined")
         {
           _this.degrees[vertex1] = 1;
         }
         else
         {
           _this.degrees[vertex1] = _this.degrees[vertex1] + 1;
         }
      }
      console.log("finish");
      console.timeEnd('loadMatrix');
      _this.load = true;
    };
    reader.readAsText(file);
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

  }

  dfs(origin)
  {

  }

}
