const request = require("request");
const gh_id = process.env.GH_CLIENT_ID;
const gh_secret = process.env.GH_CLIENT_SECRET;
class DataService {
  constructor() {
    this.reposUrl = "https://api.github.com/orgs/lab9k/repos";
  }

  getJSON(address, cb) {
    address = address + `?client_id=${gh_id}&client_secret=${gh_secret}`;
    console.log(`Fetching: ${address}`);
    request(
      address,
      {
        json: true,
        headers: {
          "User-Agent": "Lab9k",
          "Content-Type": "application/json"
        }
      },
      (err, res, body) => {
        if (err) {
          return console.error(err);
        }
        cb(body);
      }
    );
  }

  checkRepoActivity(repo) {
    let date = repo["pushed_at"];

    //console.log(date);

    date = Date.parse(date);

    let currentDate = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    //return false;
    return currentDate < date;
  }

  fetchData() {
    this.getJSON(this.reposUrl, data => {
      //Overloop de array, neem de actieve repos (laatste activiteit max 1 week geleden)
      data = data.filter(this.checkRepoActivity);
      //TODO: Overloop elke actieve repo om de contributorsinfo op te lijsten
      data.forEach(e => {
        let contsPerRepoAddress = `https://api.github.com/repos/lab9k/${
          e.name
        }/stats/contributors`;

        this.getJSON(contsPerRepoAddress, data => {
          /*data.forEach(e => {
                   console.log(e);
                 })*/
          //console.log(JSON.parse(JSON.stringify(data)));
        });
      });
    });
  }
}

module.exports = DataService;
