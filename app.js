//code sourced from git+https://github.com/mikhail-nci/wad-simple-demo.git with enhancements by GregDunne

var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    js2xmlparser = require('js2xmlparser'),
    libxslt = require('libxslt');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// GET request to dislay index.html located inside /views folder
router.get('/', function(req, res) {
  res.render('index');
});

// HTML produced by XSL Transformation
router.get('/get/html', function(req, res) {
  
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    var docSource = fs.readFileSync('Saleboard.xml', 'utf8');
    var stylesheetSource = fs.readFileSync('Saleboard.xsl', 'utf8');
    
    var doc = libxslt.libxmljs.parseXml(docSource);
    var stylesheet = libxslt.parse(stylesheetSource);
    
    var result = stylesheet.apply(doc);
    
    res.end(result.toString());
  
});

//Code for For Sale Input
// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {

    // Read in a JSON file
    var JSONfile = fs.readFileSync('Saleboard.json', 'utf8');
    //JSONfile.ad.pop(obj); //didn't work either

    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);

    // Add a new record into ad array within the JSON file   
    JSONparsed.ad.shift(obj); //replaces 1st item of json array when adding new posting
    JSONparsed.ad.push(obj);

    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);

    // Write the updated JSON file back to the system 
    fs.writeFileSync('Saleboard.json', JSONformated);

    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse("salesboard", JSON.parse(JSONformated));

    // Write the resulting XML back to the system
    fs.writeFileSync('Saleboard.xml', XMLformated);

  }

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});


/**
//Code to delete last array.
// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {

    // Read in a JSON file
    var JSONfile = fs.readFileSync('Saleboard.json', 'utf8');
    //JSONfile.ad.pop(obj); //didn't work either

    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);

    // Add a new record into ad array within the JSON file    
    JSONparsed.ad.pop(obj);
    JSONparsed.ad.push(obj);

    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);

    // Write the updated JSON file back to the system 
    fs.writeFileSync('Saleboard.json', JSONformated);

    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse("salesboard", JSON.parse(JSONformated));

    // Write the resulting XML back to the system
    fs.writeFileSync('Saleboard.xml', XMLformated);

  }


  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});
**/

//Code for ToBuy Input
// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {

    // Read in a JSON file
    var JSONfile = fs.readFileSync('Saleboard.json', 'utf8');

    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);

    // Add a new record into ad array within the JSON file  
    //JSONparsed.ad = {}; - Doesn't work
    JSONparsed.ad.push(obj);

    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);

    // Write the updated JSON file back to the system 
    fs.writeFileSync('Saleboard.json', JSONformated);

    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse("salesboard", JSON.parse(JSONformated));

    // Write the resulting XML back to the system
    fs.writeFileSync('Saleboard.xml', XMLformated);

  }

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});





/**
//Code for For Sale Input (to clear data)
// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to delete some of JSON file & convert to XML
  function deleteJSON(obj) {

    var JSONfile = fs.readFileSync('Saleboard.json', 'utf8');// Read in a JSON file
    
    
    var JSONparsed = JSON.parse(JSONfile); // Parse the JSON file in order to be able to edit it 
    JSONparsed.ad.pop(obj); // tried splice and pop too
    
    //delete json[ad]; // delete record from ad array within the JSON file   
    
    var JSONformated = JSON.stringify(JSONparsed, null, 4);// Beautify the resulting JSON file
    fs.writeFileSync('Saleboard.json', JSONformated); // Write the updated JSON file back to the system 
    
    var XMLformated = js2xmlparser.parse("salesboard", JSON.parse(JSONformated)); // Convert the updated JSON file to XML   
    fs.writeFileSync('Saleboard.xml', XMLformated); // Write the resulting XML back to the system


  }

  // Call appendJSON function and pass in body of the current POST request
  
  deleteJSON(req.body)
  
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});
//
**/


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});