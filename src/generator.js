const DataService = require("./stats");
var fs = require("fs");
const Mustache = require("mustache");

class BlogPostGenerator {
  constructor() {
    this.dataService = new DataService();   
  }

   //krijg gegevens van stats.js
  getStats(repo){

    return new Promise((resolve,reject) => {
      this.dataService.getContributorsActivity(repo).then(contributors => { 
        return contributors;
        
      }).then(contributors => {      
        this.dataService.getCommitActivity(repo).then(commits => {
          resolve({contributors,commits})
        });
          
      }).catch(reject);
    })   
  }  

  build() {
    return this.dataService.build();
  }

  createPost() {
    var template = "";
    var active_repos = [];

    this.dataService.activeRepos.forEach(repo => {
      active_repos.push(repo);
    });

    this.getStats.getCommitActivity

    console.log(active_repos);
    
    //read markdown template as a string.
    fs.readFile("templates/template.md", function(err, data) {
      if (err) {
        return console.log(err);
      }
      template = data.toString();
      let json = {
        repo: {
          name: "Skos",
          description: "Skosmos project with the great vocbench software...",
          contributors: "testfase",
          commits: 30,
          commits_overview_url: "www.google.com"
        },
        active_repos: active_repos, 
        report: {
          date: function() {
            let d = new Date();
            return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
          }
        }
      };
      let output = Mustache.render(template, json);

      fs.writeFile("templates/testreport.md", output, err => {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    });

  }
}

module.exports = BlogPostGenerator;
