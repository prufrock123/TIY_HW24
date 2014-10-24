
window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/dist/lodash.min.js"},
        {url: "./bower_components/pathjs/path.min.js"},
        {url: "./bower_components/foundation/js/foundation.js"}
    ).then(function(){
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;

        // start app?
    var options = {
        app_key: "4164fad3825e0f682dfe82b17b4acf89",
        app_id: "2e7123cd"
    };

    var recipe = new LeftOver(options);

    });

}

// http://api.yummly.com/v1/api/recipes?_app_id=app-id
// &_app_key=app-key&your _search_parameters

function LeftOver(options) {
    "use strict";
    if (!options.app_key) {
        throw new Error("Not going to work w/o API key brah");
    }
    this.yum_url = "http://api.yummly.com/v1/api/recipes?_app_id=";
    this.app_id = options.app_id;    
    this.app_key = options.app_key;
    this.complete_api_url = this.yum_url + this.app_id + "&_app_key=" + this.app_key + "&";

    console.log(this.complete_api_url);
    this.Routing();
}

function joyRide(){ 
    "use strict";
    $(document).foundation('joyride', 'start');
}

LeftOver.prototype.pullRecipes = function(parameters) {
    "use strict";
    return $.getJSON(
        this.complete_api_url + "&q=onion+soup&allowedIngredient[]=garlic&allowedIngredient[]=cognac")
    .then(function(data){
        // console.log(data);
        return data;
    });
};

LeftOver.prototype.Routing = function(){
    "use strict";
    var self = this;

    Path.map("#/").to(joyRide);

    Path.map("#/results").to(function() {
        $.when(
            self.pullRecipes()
        ).then(function(data) {
            // debugger;
            console.log(data);
        });
    });

    Path.root("#/");
    Path.listen();
};


