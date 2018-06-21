var http = require('http');
var fs = require('fs');
var html_file_path = "./MyPage.html"
var server = http.createServer(function (req, resp) {
    if (req.method === 'POST') {
		var body = '';
	req.on('data', function(chunk) {
	    body += chunk.toString(); // convert Buffer to string
	        
	});
	req.on('end', function() {
	    write_to_file(body)
	    resp.end('Chala Sataryala..  What Say,,!!');
	        
	});
    }
    else{
	fs.readFile(html_file_path, function (error, pgResp) {
    	    if (error) {
    		resp.writeHead(404);
    		resp.write('Contents you are looking are Not Found. please check the file path');
		
    	    } else {
     		resp.writeHead(200, { 'Content-Type': 'text/html' });
     		resp.write(pgResp);
		
     	    }
	    
    	    resp.end();
	    
	});
    }

    
});

var write_to_file = function(data) {
    var data_list = data.split("&")
    var roll_number = data_list[1].split("=")[1]
    var name = data_list[0].split("=")[1]
    var data = "name :"+name+"\nRoll NO.: "+roll_number+".\n"
    var writeStream = fs.createWriteStream("data/"+roll_number+".text");
    writeStream.write(data);
    writeStream.end();    
    console.log('Saved!');

};

server.listen(5050);

console.log('Server Started listening on 5050');
