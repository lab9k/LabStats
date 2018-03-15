<img src="https://lab9k.github.io/images/logo.svg" width="170">

# Lab9k Github report {{{ report.date }}}

# 1. Active repositories

{{#report.stats.repos}} 
## [{{{ repo_data.name }}}]({{{ repo_data.html_url }}})

* Laatste commit op : {{{ repo_data.updated_at }}} 
    
* **Commit Activity:**
    {{#commit_data}}
    * Totaal aantal commits deze week: {{{ total }}}
    {{/commit_data}}

{{/report.stats.repos}}








