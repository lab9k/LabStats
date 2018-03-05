const request = require("request");

class DataService {
  constructor() {
    this.reposUrl = "https://api.github.com/orgs/lab9k/repos";
  }

  getJSON(address, cb) {
    request(
      address,
      { json: true, headers: { "User-Agent": "Lab9k" } },
      (err, res, body) => {
        if (err) {
          return console.error(err);
        }
        cb(body);
      }
    );
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
