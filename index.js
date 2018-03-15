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

var init = function() {
  let g = new Generator();
  g
    .build()
    .then(() => {
      console.log("Repositories are now accessible, generator can proceed.");
      g.createPost();
      //g.getStats();
    })
    .catch(() => {
      console.log("fetching data failed... Trying again...");
      init();
    });
};

init();
