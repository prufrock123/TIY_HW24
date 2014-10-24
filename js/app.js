
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
    this.ingredient = "&allowedIngredient[]="
    this.app_id = options.app_id;    
    this.app_key = options.app_key;
    this.complete_api_url = this.yum_url + this.app_id + "&_app_key=" + this.app_key + "&q=onion+soup";

    console.log(this.complete_api_url);
    this.Routing();
}

function joyRide(){ 
    "use strict";
    $(document).foundation('joyride', 'start');
}

LeftOver.prototype.pullRecipes = function(parameters) {
    "use strict";

    var parameters = {};
    $('form [name]').each(function(){
    parameters[this.name] = this.value;
    });

    // console.dir(parameters);
    // debugger;

    return $.getJSON(
        this.complete_api_url + this.ingredient + parameters.protein + this.ingredient + parameters.vegetable + this.ingredient + parameters.carb)  
        // http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup&allowedIngredient[]=garlic&allowedIngredient[]=cognac
        // http://api.yummly.com/v1/api/recipes?_app_id2e7123cd&_app_key=4164fad3825e0f682dfe82b17b4acf89&q=onion+soup&allowedIngredient[]=garlic&allowedIngredient[]=cognac")
        // http://api.yummly.com/v1/api/recipes?_app_id2e7123cd&_app_key=4164fad3825e0f682dfe82b17b4acf89&q=onion+soup&allowedIngredient[]=beef&allowedIngredient[]=carrot&allowedIngredient[]=potato
    .then(function(data){
        // console.log(data);
        return data;
    });
};


// this.complete_api_url + "&q=onion+soup&allowedIngredient[]=" + parameters.protein + "&" + parameters.vegetable + "&" + parameters.carb)






// Turning our completed form into a JSON object that we can pass to the pullRecipes function.
// var form = document.querySelector("form");

// function ConvertFormToJSON(form){
//     var array = form.serializeArray();
//     var json = {};

//     jQuery.each(array, function() {
//         json[this.name] = this.value || ''; 
//     });
// }

// var parameters = 

// {
//     protein = value from form,
//     vegetable = value from form,
//     carb = value from form
// }

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


