const https = require("https");

class DataService {
  constructor() {
    this.reposUrl = "https://api.github.com/orgs/lab9k/repos";
  }

  getJSON(address, cb) {
    let options = {
      hostname: "https://api.github.com",
      port: 443,
      path: "/orgs/lab9k/repos",
      method: "GET"
    };
    https
      .get(options, resp => {
        let data = "";
        resp.on("data", chunk => {
          data += chunk;
        });
        resp.on("end", () => {
          console.log(JSON.parse(data));
          cb(data);
        });
      })
      .on("error", error => {
        console.error(error);
      });
  }

  fetchData() {
    this.getJSON(this.reposUrl, data => {
      //TODO: overloop de array, neem de actieve repos (laatste activiteit max 1 week geleden)
      for (const repo of data) {
        console.log(repo.name);
      }
    });
  }
}

module.exports = DataService;
