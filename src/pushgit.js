/* const fs = require("fs");
const { gitCommitPush } = require("git-commit-push-via-github-api");
process.on("unhandledRejection", console.dir);
if (!process.env.GITHUB_API_TOKEN) {
    throw new Error("GITHUB_API_TOKEN=xxx node example.js");
}
gitCommitPush({
    // commit to https://github.com/lab9k/lab9k.github.io
    owner: "lab9k",
    repo: "lab9k.github.io",
    // commit files
    files: [
        // path is the path of the git repo
        // content is the current content on disk
        { path: "_posts/testreport.md", content: fs.readFileSync(__dirname + "../templates/testreport.md", "utf-8") }
    ],
    fullyQualifiedRef: "heads/master",
    forceUpdate: false, // optional default = false
    commitMessage: "testreport from labstats"
})
    .then(res => {
        console.log("success", res);
    })
    .catch(err => {
        console.error(err);
    }); */