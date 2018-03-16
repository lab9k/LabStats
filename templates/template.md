<img src="https://lab9k.github.io/images/logo.svg" width="170">

# Lab9k Github report {{{ report.date }}}

# Active repositories

{{#report.stats.repos}} 
## [{{{ repo_data.name }}}]({{{ repo_data.html_url }}})

* Laatste commit op : {{{ repo_data.updated_at }}} 
    
### Commit activity binnen {{{ repo_data.name }}}
{{#commit_data}}

* Totaal aantal commits deze week: {{{ total }}}

| Dag       | Aantal Commits    |
|:---       |:---               |
| Maandag   | {{days.0}}   |
| Dinsdag   | {{days.1}}   |
| Woensdag  | {{days.2}}   |
| Donderdag | {{days.3}}   |
| Vrijdag   | {{days.4}}   |
| Zaterdag  | {{days.5}}   |
| Zondag    | {{days.6}}   |
{{/commit_data}}

### Contributors activity binnen {{{ repo_data.name }}}
{{#contrib_data}}

* **{{ author.login }}** heeft deze week binnen deze repository gewerkt & heeft in totaal **{{ total }} veranderingen** binnen de Lab9K organisatie gedaan, waarvan:
{{#weeks}}
    * **{{ a }} additions**
    * **{{ d }} deletions**
    * **{{ c }} commits**
{{/weeks}}

{{/contrib_data}}
{{/report.stats.repos}}








