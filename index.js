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
    g.createPost();
    g.testLoggingActivity();
  })
  .catch(console.log);


<<<<<<< HEAD
  //testing/logging getContrActivity && getCommitActivity

=======
>>>>>>> 380d9b7c80953bc60c279fb91a1e747261be9f72

