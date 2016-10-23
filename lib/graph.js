class Graph
{
  constructor(file, type)
  {
    this.type = type;

    if(this.type == 0)
    {
      this.matrix = loadGraphFromFileAsMatrix(file);
    }

    if (this.type == 1)
    {
      this.list = loadGraphFromFileAsList(file);
    }

  }

  loadGraphFromFileAsList(file)
  {

  }

  loadGraphFromFileAsMatrix(file)
  {

  }
}
