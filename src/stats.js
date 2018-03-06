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

  compareDates(date, maxDaysAgo) {
    //console.log(date);

    date = Date.parse(date);

    let currentDate = new Date().getTime() - maxDaysAgo * 24 * 60 * 60 * 1000;
    //return false;
    return currentDate < date;
  }

  fetchData() {
    this.getJSON(this.reposUrl, data => {
      //Overloop de array, neem de actieve repos (laatste activiteit max 1 week geleden)
      data = data.filter(data => {
        return this.compareDates(data["pushed_at"], 7);
      });
      //TODO: Overloop elke actieve repo om de contributorsinfo op te lijsten
      data.forEach(e => {
        let contsPerRepoAddress = `https://api.github.com/repos/lab9k/${
          e.name
        }/stats/contributors`;

        //TODO: overloop voor elke contributor zijn activiteit van de laatste 5 weken
        this.getJSON(contsPerRepoAddress, data => {
          data.forEach(d => {
            let weken = d.weeks;
            let author = d.author.login;

            weken = weken.filter(data => {
              return data["c"] >= 1;
            });
            console.log(
              `${author} commits: OUDE WEKEN voor ${e.name}:` + weken.length
            );

            weken = weken.filter(data => {
              return this.compareDates(data["w"], 35);
            });

            console.log(
              `${author} commits: NIEUWE WEKEN voor ${e.name}:` + weken.length
            );
          });
        });
      });
    });
  }
}

module.exports = DataService;
