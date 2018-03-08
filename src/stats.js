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
   *ac
   * @returns Promise
   * @memberof DataService
   */
  build() {
    let reposUrl = "https://api.github.com/orgs/lab9k/repos";
    return new Promise((resolve, reject) => {
      this.getJSON(reposUrl)
        .then(data => {
          data = data.filter(data => {
            return this.compareDates(data["pushed_at"], 7, true);
          });
          data.forEach(repo => {
            this.activeRepos.push(repo);
          });
          resolve(data);
        })
        .catch(reject);
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
    });
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

  getContributorsActivity(repoName) {
    let contsPerRepoAddress = `https://api.github.com/repos/lab9k/${repoName}/stats/contributors`;
    /*Overloop voor elke contributor zijn activiteit van de laatste 5 weken*/

    return new Promise((resolve, reject) => {
      this.getJSON(contsPerRepoAddress)
      .then(data => {
        let res = [];
        data.forEach(c => {
          let weken = c.weeks.filter(data => {
            return data["c"] >= 1;
          });
          weken = weken.filter(data => {
            return this.compareDates(data["w"] * 1000, 35, false);
          });
          c.weeks = weken;
          res.push(c);
        });
        resolve(res);
      })
      .catch(reject);
    })    
  }

  /**
   *
   *
   * @memberof DataService
   */
  getCommitActivity(repoName) {
    let url = `https://api.github.com/repos/lab9k/${repoName}/stats/commit_activity`;
    
    return new Promise((resolve, reject) => {
      this.getJSON(url)
      .then(data => {
        let nietLegeWeken = data.filter(w => {
          return w["total"] >= 1;
        });
        resolve(nietLegeWeken);
      })
      .catch(reject);
    })    
  }

  /**
   *
   * @deprecated
   * @memberof DataService
   */
  fetchData() {
    console.error("fetchData is deprecated");
  }
}

module.exports = DataService;
