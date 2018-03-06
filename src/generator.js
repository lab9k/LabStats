const DataService = require("./stats");
class BlogPostGenerator {
  constructor() {
    this.dataService = new DataService();
  }

  build() {
    return this.dataService.build();
  }
}

module.exports = BlogPostGenerator;
