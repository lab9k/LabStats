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
    this.getJSON(this.reposUrl, data => {
      //Overloop de array, neem de actieve repos (laatste activiteit max 1 week geleden)
      data = data.filter(data => {
        return this.compareDates(data["pushed_at"], 7, true);
      });
      //TODO: Overloop elke actieve repo om de contributorsinfo op te lijsten
      data.forEach(e => {
        let contsPerRepoAddress = `https://api.github.com/repos/lab9k/${
          e.name
        }/stats/contributors`;

        //TODO: overloop voor elke contributor zijn activiteit van de laatste 5 weken
        this.getJSON(contsPerRepoAddress, data => {
          data.forEach(d => {
<<<<<<< HEAD
            let weken = d.weeks;
            let author = d.author.login;
=======
            let authorName = d.author.login;
>>>>>>> cce7f3d88d84c5468bc47f57908f7d19330f475c

            weken = weken.filter(data => {
              return data["c"] >= 1;
            });
            console.log(
              `${author} commits: OUDE WEKEN voor ${e.name}:` + weken.length
            );

            weken = weken.filter(data => {
              let date = data["w"];
              let currentDate = new Date().getTime() - 35 * 24 * 60 * 60 * 1000;
              let result = this.compareDates(data["w"], 35, false);
              console.log(
                `Date: ${date} , currentDate: ${currentDate} , result: ${result}`
              );
              return this.compareDates(data["w"], 35, false);
            });

            console.log(
              `${author} commits: NIEUWE WEKEN voor ${e.name}:` + weken.length
            );
          });
        });
      });

      console.log("========================================================================================")

      //TODO: geef commit activity van de betreffende weken van het voorbije jaar 
      data.forEach(e => {
        let commitActivity = `https://api.github.com/repos/lab9k/${
          e.name
        }/stats/commit_activity`;


        this.getJSON(commitActivity, data => {

          console.log("========================================================================================")
          console.log(e.name)
          console.log("========================================================================================")

          data.forEach(ca => {
            console.log(ca);
          })
        })

      });      
    })
  }
}

module.exports = DataService;
