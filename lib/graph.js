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
        var verice0 = parseInt(vertice[0]);
        var verice1 = parseInt(vertice[1]);

         _this.matrix[verice0][verice1] = 1;
         _this.matrix[verice1][verice0] = 1;
      }
      console.log("finish");
      console.timeEnd('loadMatrix');
    };
    reader.readAsText(file);
  }
}
