// jshint esversion: 6

var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }]

  };
  var jsondata = JSON.stringify(data);


  var options = {
    url: "https://us2.api.mailchimp.com/3.0/lists/4d45d63a92",
    method: "POST",
    headers: {

      "Authorization": "7utkasrh7 75b6b6ce9c469a0ce465de3837cf7ad4-us2"
    },
    body: jsondata
  };



  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});
app.post("/failure.html", function(req,res){
  res.redirect("/");
});





app.listen( process.env.PORT||3000, function() {
  console.log("server running on port 3000");
});
