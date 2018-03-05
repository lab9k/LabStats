function ready(cb) {
    /in/.test(document.readyState) ?
        setTimeout(ready.bind(null, cb), 9) :
        cb();
};

ready(function () {

    var APIs = [], resultset = [];
    var App = {

        init: function () {

            var URLs = [
                "https://api.github.com/orgs/Lab9K",
                "https://api.github.com/repos/lab9k/Orga/stats/commit_activity",
                "https://api.github.com/repos/lab9k/Orga/stats/contributors",
                "https://api.github.com/repos/lab9k/Orga/stats/participation",
                "https://api.github.com/repos/lab9k/Skos/stats/commit_activity",
                "https://api.github.com/repos/lab9k/Skos/stats/contributors",
                "https://api.github.com/repos/lab9k/Skos/stats/participation",
                "https://api.github.com/orgs/lab9k/repos"            
            ]
            this.iterateJSON(URLs);

        },
        iterateJSON: function(URLs){
            
            for(var adres in URLs){
                this.getJSON(URLs[adres], function(data){
                    resultset.push(data);
                });                
            }
            console.log(resultset);
        },

        getJSON: function(adres, cb) {

            let xhr = new XMLHttpRequest();
            xhr.open("GET", adres, true);            
            xhr.onreadystatechange = function (oEvent) {
                if (xhr.status == 200 && xhr.readyState == 4) {

                    var data = (!xhr.responseType) ? JSON.parse(xhr.response) : xhr.response;
                    cb(data);                    
                    
                    //resultset.push(data);
                    //console.log(data);
                                      
                } else {
                    console.log(status);
                }
            }
            xhr.onerror = function () {
                console.log(Error('Network Error!'));
            }
            xhr.send();
        }
    }
    App.init();
});