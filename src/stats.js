const request = require("request");
const gh_id = process.env.GH_CLIENT_ID;
const gh_secret = process.env.GH_CLIENT_SECRET;

class DataService {
  /**
   * Creates an instance of DataService.
   * To be able to access the active repositories,
   * you should call .build() right after contructing this object.
   * The build method will return a Promise will store the active repositories when the method finishes.
   * @memberof DataService
   */
  constructor() {
    this.activeRepos = [];
  }

  /**
   *
   *
   * @returns Promise
   * @memberof DataService
   */
  build() {
    let reposUrl = "https://api.github.com/orgs/lab9k/repos";
    return new Promise((resolve, reject) => {
      try {
        this.getJSON(reposUrl, data => {
          data = data.filter(data => {
            return this.compareDates(data["pushed_at"], 7, true);
          });
          data.forEach(repo => {
            this.activeRepos.push(repo);
          });
          resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getJSON(address) {

    address = address + `?client_id=${gh_id}&client_secret=${gh_secret}`;
    console.log(`Fetching: ${address}`);

    return new Promise(function(resolve, reject) {

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
            return reject(err);
          } else {
            resolve(body);
          }
        }
      );
    })
  }

  compareDates(date, maxDaysAgo, parse) {
    //console.log(date);
    if (parse) {
      date = Date.parse(date);
    }

    let currentDate = new Date().getTime() - maxDaysAgo * 24 * 60 * 60 * 1000;
    //return false;
    return currentDate < date;
  }

  fetchData() {

    //bovenste mag weg
    this.getJSON(this.reposUrl).then(data => {
      //Overloop de array, neem de actieve repos (laatste activiteit max 1 week geleden)
      data = data.filter(data => {
        return this.compareDates(data["pushed_at"], 7, true);
      });
      //Overloop elke actieve repo om de contributorsinfo op te lijsten
      //this.activeRepo ipv data
      data.forEach(e => {
        let contsPerRepoAddress = `https://api.github.com/repos/lab9k/${
          e.name
        }/stats/contributors`;

        //TODO: overloop voor elke contributor zijn activiteit van de laatste 5 weken
        this.getJSON(contsPerRepoAddress, data => {
          data.forEach(c => {
            let authorName = c.author.login;

            let weken = c.weeks.filter(data => {
              return data["c"] >= 1;
            });

            weken = weken.filter(data => {
              return this.compareDates(data["w"] * 1000, 35, false);
            });
          });
        });
      });

      //Geef commit activity van de niet-lege weken van het voorbije jaar
      data.forEach(e => {
        let commitActivityPerRepo = `https://api.github.com/repos/lab9k/${
          e.name
        }/stats/commit_activity`;

        this.getJSON(commitActivityPerRepo, data => {
          let nietLegeWeken = data.filter(w => {
            return w["total"] >= 1;
          });
          nietLegeWeken.forEach(e => {
            console.log(e);
          });
        });
      });
    }).catch(console.log);
  }
}

module.exports = DataService;
