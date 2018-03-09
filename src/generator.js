const DataService = require("./stats");
var fs = require("fs");
const Mustache = require("mustache");

class BlogPostGenerator {
  constructor() {
    this.dataService = new DataService();
  }

  //krijg gegevens van stats.js
  getStats() {
    
    let actives = this.dataService.activeRepos;
    let actives_promises_commit_activity = [];
    let actives_promises_contributors = [];
    actives.forEach(repo => {
      let repoPromise_ca = this.dataService.getCommitActivity(repo.name);
      actives_promises_commit_activity.push(repoPromise_ca);
      let repoPromise_co = this.dataService.getContributorsActivity(repo.name);
      actives_promises_contributors.push(repoPromise_co);
    });

    return new Promise((resolve, reject) => {
      Promise.all(actives_promises_commit_activity)
        .then(data => {
          return data;
        })
        .then(commit_data => {
          Promise.all(actives_promises_contributors)
            .then(contrib_data => {
              let ret = Object.create({});
              ret.repos = [];
              actives.forEach(repo => {
                let commit_data_obj = commit_data.find(
                  el => el.repo === repo.name
                ).data;
                let contrib_data_obj = contrib_data.find(
                  el => el.repo === repo.name
                ).data;

                commit_data_obj.forEach(el => {
                  let d = new Date(el["week"] * 1000);
                  el["week"] = d.toISOString();
                });
                contrib_data_obj.forEach(el1 => {
                  let weeks = el1["weeks"];
                  weeks.forEach(el2 => {
                    let d = new Date(el2["w"] * 1000);
                    el2["w"] = d.toISOString();
                  });
                });
                let r = {
                  name: repo.name,
                  commit_data: commit_data_obj,
                  contrib_data: contrib_data_obj
                };
                ret.repos.push(r);
              });
              fs.writeFile(
                "test/test.json",
                JSON.stringify(ret),
                "utf8",
                err => {
                  if (err) {
                    return console.log(err);
                  }
                  resolve(ret);
                  console.log("The file was saved!");
                }
              );
            })
            .catch(console.error);
        })
        .catch(reject);
    });
  }

  build() {
    return this.dataService.build();
  }

  createPost() {
    var template = "";
    var active_repos = [];
    var repos_and_commits = [];

    this.dataService.activeRepos.forEach(repo => {
      active_repos.push(repo);
    });

    //read markdown template as a string.
    fs.readFile("templates/template.md", function(err, data) {
      if (err) {
        return console.log(err);
      }
      template = data.toString();
      let json = {
        active_repos: active_repos,
        report: {
          date: function() {
            let d = new Date();
            return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
          }
        }
      };
      let output = Mustache.render(template, json);

      fs.writeFile("templates/generated_report.md", output, err => {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    });
  }
}

module.exports = BlogPostGenerator;
