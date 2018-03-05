/*TODO: get statistics 

generate markdown
.replace({{title}},content)
*/
const DataService = require("./src/stats");
let ds = new DataService();
ds.fetchData();
