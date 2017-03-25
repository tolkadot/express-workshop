var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');


var app = express();

app.use(express.static("public"));
app.use(formidable());

//read from the file system


//routes

//route to create a post
app.post("/create-post", function(req,res){
   var blogpost = req.fields.blogpost; //reqFields = the blog post we have just posted
   console.log(blogpost);
   var timeInMs = Date.now();
   console.log(timeInMs);


  fs.readFile(__dirname + '/data/posts.json', function(error, file){
        var blogpostdata = JSON.parse(file); //parsedFile = contents of posts.json

        blogpostdata[timeInMs] = blogpost;
        console.log(blogpostdata);
      fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(blogpostdata, null, 4),  function(error, file){
          res.send('data saved');
        });
  });
});
//route to display the posts
app.get("/get-posts", function(req,res){

  res.sendFile(__dirname + '/data/posts.json', function (err) {

      console.log('Sent:');

  });

});



app.listen(3000, function(){
  console.log("listening on port 3000")
});
