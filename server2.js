var http = require('http'),
	fs = require('fs'),
	host = '127.0.0.1',
	path = require('path'),
	port = '9000';

var mimes = {

	".htm": "text/html",
	".css": "text/css",
	".js": "text/javascript",
	".gif": "image/gif"

}

var server = http.createServer(function(req, res) {

	// specify the filePath
	var filePath = (req.url === '/') ? ('./index.htm') : ('.' + req.url);

	// specify yhe contentType
	var contentType = mimes[path.extname(filePath)];

	// check and make sure the file exists
	fs.exists(filePath, function(file_exists) {

		if (file_exists)
		{
			// read and serve
			fs.readFile(filePath, function(error, content) {

				if (error)
				{
					res.writeHead(500);
					res.end();
				}
				else
				{
					res.writeHead(200, {'Content-Type': contentType});
					res.end(content, 'utf-8');
				}

			});
		}
		else
		{
			res.writeHead(404);
			res.end("Sorry we could not find the file you requested!");
		}
	})

}).listen(port, host, function() {

	console.log("Server running on http://" + host + ":" + port);

});