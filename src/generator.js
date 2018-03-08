const DataService = require("./stats");
var fs = require("fs");
const Mustache = require("mustache");

class BlogPostGenerator {
  constructor() {
    this.dataService = new DataService();
  }

  //krijg gegevens van stats.js
  getStats() {

    return new Promise((resolve, reject) => {
      this.dataService.getContributorsActivity("Skos").then(contributors => {
        return contributors;

      }).then(contributors => {
        this.dataService.getCommitActivity("Skos").then(commits => {
          resolve({ contributors, commits })
        });

      }).catch(reject);
    })
  }

  build() {
    return this.dataService.build();
  }

  createPost() {
    this.getStats().then((statistics) => {
      var template = "";

      /* this.dataService.activeRepos.forEach(name => {

      }); */
      
      //read markdown template as a string.
      fs.readFile("templates/template.md", function (err, data) {
        if (err) {
          return console.log(err);
        }
        template = data.toString();
        let json = {
          repo: {
            name: "Skos",
            description: "Skosmos project with the great vocbench software...",
            active_repos: "test",
            commits: 30,
            commits_overview_url: "www.google.com"
          },
          report: {
            date: function () {
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
      console.log("relax chil");
      console.log(this.dataService.activeRepos);
    })
    .catch(console.log);
  }
}

module.exports = BlogPostGenerator;
