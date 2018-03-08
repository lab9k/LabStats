<img src="https://lab9k.github.io/images/logo.svg" width="170">

# Lab9k Github report {{ report.date }}

# 1.1.Active repositories
Active repositories of last week:
{{#repo.active_repos}} 
* [{{ name }}]({{ html_url }})
{{/repo.active_repos}}


See the project on [github]({{ repo.url }})

### 1.2.Contributors

All the people that contributed to this project.

{{#repo.contributors}}
{{name}}
{{/repo.contributors}}

* [User 1](https://github.com/rubenalliet)

### 1.3.Commits

This graph shows the amount of commits done by each user for Project x.

| Users                                    | Commits |
| ---------------------------------------- | ------- |
| [User 1](https://github.com/rubenalliet) | 10      |
| [User 1](https://github.com/rubenalliet) | 20      |

{{ repo.commits }}

To get a complete overview click [here]({{ repo.commits_overview_url }})

### 1.4.Kanban Board | Progress

This board gives an overview of the current state of the project.

| Todo | In progress | Testing | Done |
| ---- | ----------- | ------- | ---- |


project_kanban_board_items

To get a complete overview click [here](project_kanban_board_url)
