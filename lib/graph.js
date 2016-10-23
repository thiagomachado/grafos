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
    this.list = 1;
  }

  loadGraphFromFileAsMatrix(file)
  {
    this.matrix = 0;
  }
}
