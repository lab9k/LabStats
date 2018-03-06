/*TODO: get statistics 

generate markdown
.replace({{title}},content)
*/
require("dotenv").config();
const DataService = require("./src/stats");
let ds = new DataService();
ds.fetchData();
