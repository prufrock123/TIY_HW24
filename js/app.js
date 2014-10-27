
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
    if(!options.app_id) {
        throw new Error("Not going to work w/o ID key either");
     }
    this.yum_url = "http://api.yummly.com/v1/api/recipes?_app_id=";
    this.ingredient = "&allowedIngredient[]=";
    this.course = "&allowedCourse[]=course^course-";
    this.app_id = options.app_id;    
    this.app_key = options.app_key;
    this.complete_api_url = this.yum_url + this.app_id + "&_app_key=" + this.app_key;

    console.log(this.complete_api_url);
    this.Routing();
}


// function joyRide(){ 
//     "use strict";
//     $(document).foundation('joyride', 'start');
// }

    LeftOver.prototype.createInputObject = function() {
        var input = {};
        $(':input').each(function(){
        input[this.name] = this.value;
        });

        console.dir(input);
        return input;
    };

    LeftOver.prototype.pullRecipes = function() {
        "use strict";

        // callback();
        var input = this.createInputObject();

        // console.dir(parameters);
        // debugger;

        return $.getJSON(
            this.complete_api_url + this.ingredient + input.protein + this.ingredient + input.vegetable + this.ingredient + input.carb + this.course + input.course)  
            // http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY&q=onion+soup&allowedIngredient[]=garlic&allowedIngredient[]=cognac
            // http://api.yummly.com/v1/api/recipes?_app_id2e7123cd&_app_key=4164fad3825e0f682dfe82b17b4acf89&q=onion+soup&allowedIngredient[]=garlic&allowedIngredient[]=cognac")
            // http://api.yummly.com/v1/api/recipes?_app_id2e7123cd&_app_key=4164fad3825e0f682dfe82b17b4acf89&q=onion+soup&allowedIngredient[]=beef&allowedIngredient[]=carrot&allowedIngredient[]=potato
        .then(function(data){
            console.log(data);
            return data.matches;
        });
    };

    LeftOver.prototype.loadTemplate = function(template) {
        return $.get('./templates/' + template + '.html').then(function(htmlString){
            return htmlString;
        });
    };

    LeftOver.prototype.putRecipeOnPage = function(data, html) {
        // debugger;
        console.log(data);
        document.querySelector('#recipes').innerHTML = 
        data.map(function(element) {
            console.log(element.imageUrlsBySize)
            return _.template(html, element);
        }).join("");
    };

    LeftOver.prototype.Routing = function(){
        "use strict";
        var self = this;

        // Path.map("#/").to(joyRide);

        Path.map("#/results").to(function() {
            $.when(
                self.pullRecipes(),
                self.loadTemplate('recipes')
            ).then(function(data, recipeHtml) {
                // debugger;
                // console.log(data),
                self.putRecipeOnPage(data, recipeHtml);
            });
        });

        Path.root("#/");
        Path.listen();
    };

// scrap notes
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

