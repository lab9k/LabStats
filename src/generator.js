var fs = require("fs");

class BlogPostGenerator {
  createPost() {
    var template = "";
    //read markdown template as a string. 
    fs.readFile("../templates/template.md", function (err, data) {
      if(err) {
        return console.log(err);
      }
      template = data.toString();
    });
    
    //fetch data from stats.js
    //Recognize parameters {{ }} & replace them with values from stats.js
    //template.replace(regexp|substr, newSubstr|function);

    //Store String as a markdown file.
    fs.writeFile("../templates/testreport.md", template, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    }); 
    
  }

}

module.exports = BlogPostGenerator;