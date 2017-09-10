var graphFilePath     = process.argv[2];

fs = require('fs');
fs.readFile(graphFilePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  data = data.split('\n');
  nVertices = parseInt(data[0]);
  console.log(nVertices);
  var arr = new Array(nVertices);
  for (var i = 1, limit = data.length; i < limit; i++) {
  	var vertices = data[i].split(' ');
  	if (vertices.length != 2) {
  		console.log('line '+ data[i]);
  	}
  	else
  	{
  		if(vertices[0] > nVertices)
  		{
  			console.log('error vertices 0 = ' + vertices[0]);
  		}
  		if(vertices[1] > nVertices)
  		{
  			console.log('error vertices 1 = ' + vertices[1]);
  		}

	  	arr[vertices[0]] = true;
	  	arr[vertices[1]] = true;
  	}
  }
});
