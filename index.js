/*TODO: get statistics 

generate markdown
.replace({{title}},content)
*/
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const DataService = require("./src/stats");
let ds = new DataService();
ds.fetchData();
