class Graph
{
  constructor(file, type)
  {
    if(type == 0)
    {
      this.matrix = loadGraphFromFileAsMatrix(file);
    }

    if (type == 1)
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
