class BlogPostGenerator {
  constructor() {}
  markdownlayout = 
  //Lab9k logo
  "<img src='https://lab9k.github.io/images/logo.svg' width='170'>\n" +
  "# Lab9k Github report (Insert date range here)\n" +
  //Iterate over all active projects 
  //Project 1
  "## 1. Project X\n" +
  //Description 
  "### 1.1.Description\n\n" +
  "Insert Project description here\n\n" +
  "See the project on [github](https://github.com/lab9k/lab9k.github.io)\n" + 
  //Contributors
  "### 1.2.Contributors\n" + 
  "All the people that contributed to this project.\n" +
  //Iterate over all  users
  "* [User 1](https://github.com/rubenalliet)\n\n" +
  //Commits
  "### 1.3.Commits\n" +
  "This graph shows the amount of commits done by each user for Project x.\n\n" +
  //Iterate over commits per project 
  "| Users                                    |        Commits          | \n" +
  "| -----------------------------------------| ----------------------- | \n" +
  "| [User 1](https://github.com/rubenalliet) |     10                  | \n\n" +
  "To get a complete overview click [here](https://github.com/lab9k/lab9k.github.io/graphs/contributors)\n\n" + 
  //Kan ban board todo board
  "### 1.4.Kanban Board | Progress\n\n" +
  "This board gives an overview of the current state of the project.\n\n";
  //Iterate over all tasks of kanban board 
  "| Todo               |In progress         | Testing            | Done                | \n";
  "|--------------------|--------------------|--------------------|---------------------| \n\n";
  "|Item 1              |Item 2              |Item 3              |Item 4               | \n\n";

  //URL to kanban board
  "To get a complete overview click [here](https://github.com/lab9k/Skos/projects/1)\n";

  
  ;

}

module.exports = BlogPostGenerator;
