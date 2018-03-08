<img src="https://lab9k.github.io/images/logo.svg" width="170">

# Lab9k Github report {{ report.date }}

# 1.Active repositories
Active repositories of last week:
{{#repo.active_repos}} 
* [{{ name }}]({{ html_url }})
{{/repo.active_repos}}

# 1.Contributors

All the people that contributed to this project.

{{#repo.contributors}}
{{name}}
{{/repo.contributors}}

* [User 1](https://github.com/rubenalliet)

### 1.3.Commits

This graph shows the amount of commits done by each user for Project x.

| Projects                                 | Commits     |
| ---------------------------------------- | ----------- |
{{#repo.active_repos}} 
| {{ name }}                               | {{ name }}  |
{{/repo.active_repos}}


To get a complete overview click [here]({{ repo.commits_overview_url }})

