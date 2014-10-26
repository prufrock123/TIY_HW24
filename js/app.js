
window.onload = app;

// runs when the DOM is loaded
function app(){

    // load some scripts (uses promises :D)
    loader.load(
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/dist/lodash.min.js"},
        {url: "./bower_components/pathjs/path.min.js"},
        {url: "./bower_components/foundation/js/foundation.js"}
    ).then(function(){
        _.templateSettings.interpolate = /{([\s\S]+?)}/g;
        //$(document).foundation('joyride', 'start');
        // start app?
    
    var options = {appkey: "14769cacd9015eac3cd104f98cebcbee", idkey: "95b64149"};
    
    var recipe = new leftOver(options); //make a cookie called recipe using cookie-cutter called leftOver

    });

}

function leftOver(options) {
     if (!options.appkey) {
         throw new Error("Not going to work w/o APP key brah");
     }

     if(!options.idkey) {
        throw new Error("Not going to work w/o ID key either");
     }

     this.yummly_url = "http://api.yummly.com/v1/api/recipes?_app_id=";                 //"this." whatever is all one cookie
     this.ingredient = "&allowedIngredient[]=";
     this.appkey = options.appkey;
     this.idkey = options.idkey;
     this.completeURL = this.yummly_url + this.idkey + "&_app_key=" + this.appkey;
     
     console.log(this.completeURL);

     this.setupRouting();
 }

leftOver.prototype.pullRecipes = function(){

    var input = this.createInputObject();

    return $.getJSON(this.completeURL + this.ingredient + input[0] + this.ingredient + input[1] + this.ingredient + input[2]).then(function(data){
        
        console.log(data);

        return data;

    });
};


//var input =  
//this needs to take the info from the form and create an object that has 3 properties and values (protein=form1, veg=form2, carb=form3)
leftOver.prototype.createInputObject = function(){
    
    var array = $("form [name]").serializeArray();
    var input = {};

    $.each(array, function(){
        input[this.name] = this.value;
    });

    console.dir(input);

    return input;
};

leftOver.prototype.loadTemplate = function(name){
    return $.get("./templates/" + name + ".html").then(function(htmlString){
        return htmlString;
    });
};

leftOver.prototype.putRecipesOnPage = function(templateString, data){
    
    console.log(templateString);
    
    document.querySelector('#recipearea').innerHTML = data.results.map(function(x){
        return _.template(templateString, x);
    }).join("");
};

leftOver.prototype.setupRouting = function(){

    var self = this;

    // Path.map("#/").to(function(){
    //     $.when(self.pullRecipes()
    //         ).then(function(self){
    //             console.log(self);
    //         });
    // });


    Path.map("#/results").to(function(){
        $.when(
            self.loadTemplate('recipes'),
            self.pullRecipes()
            ).then(function(data, recipeHtml){
                self.putRecipesOnPage(data, recipeHtml);
            });
    });


Path.root("#/");
Path.listen();

};
