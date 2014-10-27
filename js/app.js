
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
    var yum_options = {
        app_key: "4164fad3825e0f682dfe82b17b4acf89",
        app_id: "2e7123cd"
    };

    var oven_options = {
        api_key: "dvxVx0d11bD2O2D8z4L627I15fZu05Em"
    };

    var recipe = new LeftOver(yum_options, oven_options);

    });

}

// http://api.yummly.com/v1/api/recipes?_app_id=app-id
// &_app_key=app-key&your _search_parameters

function LeftOver(yum_options, oven_options) {
    "use strict";
    if (!yum_options.app_key) {
        throw new Error("Not going to work w/o Yummly API key bruh");
    }
    if(!yum_options.app_id) {
        throw new Error("Not going to work w/o Yummly ID key either");
     }

    if(!oven_options.api_key) {
        throw new Error("Need your BigOven key too fool");
    }

    this.yum_url = "http://api.yummly.com/v1/api/recipes?_app_id=";
    this.yum_ingredient = "&allowedIngredient[]=";
    this.yum_course = "&allowedCourse[]=course^course-";
    this.app_id = yum_options.app_id;    
    this.app_key = yum_options.app_key;
    this.yum_complete_api_url = this.yum_url + this.app_id + "&_app_key=" + this.app_key;

    
    this.oven_url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw=";
    this.api_key = oven_options.api_key;


    console.log(this.yum_complete_api_url);
    console.log(this.oven_url);
    this.Routing();
}


// function joyRide(){ 
//     "use strict";
//     $(document).foundation('joyride', 'start');
// }

    LeftOver.prototype.createInputObject = function() {
        "use strict";
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
            this.yum_complete_api_url + this.yum_ingredient + input.protein + this.yum_ingredient + input.vegetable + this.yum_ingredient + input.carb + this.yum_course + input.course)  
        .then(function(data){
            console.log(data);
            return data.matches;
        });
    
    };

    LeftOver.prototype.pullOvenRecipes = function(){
        "use strict";

        var input = this.createInputObject();

        return $.getJSON(
            this.oven_url + input.protein + "&api_key=" + this.api_key)
        .then(function(data){
            console.log(data.Results);
            return data.Results;
        });
    };


    LeftOver.prototype.loadTemplate = function(template) {
        return $.get('./templates/' + template + '.html').then(function(htmlString){
            return htmlString;
        });
    };

    LeftOver.prototype.putRecipeOnPage = function(data, html) {
        "use strict";
        // debugger;
        console.log(data);
        console.log(html);
        document.querySelector('#recipes').innerHTML = 
        data.map(function(element) {
//            console.log(element.imageUrlsBySize)
              console.log(element);
            return _.template(html, element);
        }).join("");
    };

    LeftOver.prototype.putOvenRecipeOnPage = function(data, html) {
        "use strict";
        console.log(data);
        console.log(html);
        document.querySelector('#ovenrecipes').innerHTML = 
        data.map(function(element) {
//            console.log(element.imageUrlsBySize)
              console.log(element);
            // if(element.imageURL){
            //     return _.template(html, element);   
            // } else {
            //     return;
            // }
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
                self.pullOvenRecipes(),
                self.loadTemplate('recipes'),
                self.loadTemplate('ovenrecipes')
            ).then(function(yumdata, ovendata, recipeHtml, ovenHtml) {  //data has to be called first because  self.pullRecipes is being brought in first which takes "data", then loadTemplate takes the html
                // debugger;
                console.log(yumdata)
                console.log(ovendata)
                self.putRecipeOnPage(yumdata, recipeHtml);
                self.putOvenRecipeOnPage(ovendata, ovenHtml);
            });
        });

        $("#refresh").click(function() {
            $.when(
                self.pullRecipes(),
                self.pullOvenRecipes(),
                self.loadTemplate('recipes'),
                self.loadTemplate('ovenrecipes')
            ).then(function(yumdata, ovendata, recipeHtml, ovenHtml) {
                // debugger;
                // console.log(data),
                self.putRecipeOnPage(yumdata, recipeHtml)
                self.putOvenRecipeOnPage(ovendata, ovenHtml)
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

