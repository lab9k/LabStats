# LabStats

## Inhoud 

Deze tool draagt bij tot het verbeteren van het project management binnen Lab9K. LabStats is een project waarbij we getracht hebben om zoveel mogelijk belangrijke data op te halen van de organisatie met betrekking tot de gebruikersactiviteit, voornamelijk de commit- en contributorsactiviteit binnen een project. Dat werd gerealiseerd door queries te schrijven die de gewenste data d.m.v. de GitHub API kan ophalen. 

Momenteel is er een `template.md` bestand aanwezig waarin de opbouw van het (eventueel wekelijkse) Markdown bestand in gespecifiëert wordt en met welke objecten dit zal opgevuld worden. Hiervoor is **[Mustache](https://mustache.github.io/)** verantwoordelijk. Mustache is een library die het mogelijk maakt om een Markdown bestand dynamisch op te bouwen aan de hand van (bijvoorbeeld) JSON en JavaScript-objecten (die in onderstaande .js bestanden gegenereerd worden).

De overige bestanden werden volledig in JavaScript geschreven. Er zijn drie .js bestanden aanwezig binnen het project:

* **stats.js**: haalt de betreffende gegevens op uit de actieve repositories, d.m.v. de GitHub API.  
* **generator.js**: verantwoordelijk voor het doorgeven van de juiste gegevens aan `template.md` en het opbouwen van de blogpost.
* **index.js**: een soort constructor script die de build uitvoert van de generator klasse, de gegevens ophaalt & de blogpost creëert.

Een ander belangrijk (struikel)punt was de geauthoriseerde connectie maken met GitHub via een HTTP request. Dat moet gebeuren via een Client ID en een Client Token, gegenereerd voor onze GitHub organisatie, die in het `.env` bestand gespecifiëerd zijn. 


## Het (voorlopige) resultaat

Het doel was initieel om de data die opgevraagd werd van GitHub te gebruiken bij de automatische generatie van een wekelijkse blogpost op [de website van Lab9K](https://lab9k.github.io/). Dit met de bedoeling dat iedereen die betrokken is bij Lab9K een overzicht heeft van wat er wanneer en door wie gerealiseerd werd. Dit bestand wordt dan in de _posts directory geplaatst en kan uiteraard nog manueel door de verantwoordelijke(n) aangepast en aangevuld worden waar nodig. 

Helaas zijn we er (nog) niet in geslaagd om via een POST request in JavaScript een git commit te doen naar de repository van de website  waardoor het automatisch genereren van een blogpot (nog) niet mogelijk is. Vandaar dat het Markdown bestand manueel moet toegevoegd worden in de _posts directory.

* *Update 08/03/2018:* de actieve repositories worden opgelijst in een .md bestand
* *Update 09/03/2018:* getStats()-methode retourneert één JSON object `repos` dat meerdere repository-objecten retourneert met de properties `name`,`commit_data` en `contrib_data`. Dit maakt het gemakkelijker om te itereren over de verschillende repositories en de gegevens gemakkelijker te visualiseren en aan te spreken in `template.md`.

* *In Progress:* `template.md` volledig opbouwen om alle contributors- en commit activity te kunnen laten zien per project.

## Hoe gebruiken

1. Controleer zeker dat de `templates` dir bestaat in de root van het project & dat er een `template.md` file aanwezig is.
2. Ga via de terminal naar de root van het project.
3. Voer onderstaand commando uit in de terminal:
```
node index.js
```
4. Er is nu een `generated_report.md` file aanwezig die de gebruikersgegevens van de actieve repositories van de laatste week heeft gegenereerd.



#### Auteur: Ruben Bruggeman
