class Graph
{
  constructor(file, type)
  {
    this.type = type;
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
      var nVertices = parseInt(text[0]);
      //console.log(text);
      _this.list = new Array(nVertices + 1);

      for (var i = 1; i < text.length -1; i++)
      {
        var vertice = text[i].split(" ");
        var vertice0 = parseInt(vertice[0]);
        var vertice1 = parseInt(vertice[1]);
        if(typeof _this.list[vertice0] == "undefined")
        {
          _this.list[vertice0] = new Array();
        }
        if(typeof _this.list[vertice1] == "undefined")
        {
          _this.list[vertice1] = new Array();
        }
        _this.list[vertice0].push(vertice1);
        _this.list[vertice1].push(vertice0);
      }
      console.log("finish");
      console.timeEnd('loadList');
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
      var nVertices = parseInt(text[0]);
      //console.log(text);
      _this.matrix = new Array(nVertices + 1);

      for (var i = 1; i < _this.matrix.length; i++)
      {
        _this.matrix[i] = new Array(nVertices + 1);
      }

      for (var i = 1; i < text.length -1; i++)
      {
        var vertice = text[i].split(" ");
        var vertice0 = parseInt(vertice[0]);
        var vertice1 = parseInt(vertice[1]);

         _this.matrix[vertice0][vertice1] = 1;
         _this.matrix[vertice1][vertice0] = 1;
      }
      console.log("finish");
      console.timeEnd('loadMatrix');
    };
    reader.readAsText(file);
  }
}
