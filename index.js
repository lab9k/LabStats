/*TODO: get statistics 

generate markdown
.replace({{title}},content)
*/
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const Generator = require("./src/generator");
let g = new Generator();
g
  .build()
  .then(() => {
    console.log("Repositories are now accessible, generator can proceed.");
  })
  .catch(console.log);
