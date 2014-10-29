
window.onload = app;


// Global variables
    flavor = [];
    styles = [];

//notification click

if(window.Notification){


    window.addEventListener('load', function () {


      
      if (window.Notification && Notification.permission !== "granted") {
        Notification.requestPermission(function (status) {
          if (Notification.permission !== status) {
            Notification.permission = status;
          }
        });
      }

      var button = document.querySelector('#button');

      button.addEventListener('click', function () {
        
        if (window.Notification && Notification.permission === "granted") {
          
            var n = new Notification("Enjoy your meal!");
          
        }

      
        else if (window.Notification && Notification.permission !== "denied") {
          Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
              Notification.permission = status;
            }

            if (status === "granted") {
              
                var n = new Notification("Enjoy your meal!");
              
            }

            
            else {
              alert("Hi!");
            }
          });
        }

        else {
          alert("Hi!");
        }
      });
    });

} else {
    console.log("not supported");
}


// var n = new Notification("Enjoy your meal!")

// if(event.target.id === '#button'){
// n.onclick = function(){
//     setTimeout(n.close.bind(n), 5000);
// }
// } else {
//     console.log("test");
// };


// Test code for getting all the stlyes from breweryDB:
//  
    // function getBeerStyles() {
    //    // var Beers = []
    //     return $.getJSON(
    //         "https://api.brewerydb.com/v2/styles?key=a217c616e466264744fb362e60f8c99f&format=json")
    //     .then(function(data, second, third){
    //         // debugger;
    //         // console.dir(data);
    //         // console.dir(second);
    //         // console.dir(third);
    //         // console.dir(data.data);
    //         var arrayOfStyles = data.data;
    //         addBeersToStyles(arrayOfStyles);
    //         // console.dir(arrayOfStyles);
    //         // Beers.push(data.data);
    //         // return data.data;
    //         return arrayOfStyles;
    //     });
    // }
//

// 2 new beer functions
function addBeersToStyles(array) {
    // console.dir(array);
    styles.push(array[29], array[89], array[97], array[34], {name: "Sorry, there are no beer pairings for this recipe"});
    console.dir(styles);
    return styles;
}

function beerPairer(i){
    if (!flavor[i]){
        return styles[4];
    } else if (flavor[i].bitter > .15 && flavor[i].sweet > .5){
        return styles[0];
    } else if (flavor[i].sweet > .15){
        return styles[1];
    } else {
        return styles[3];
    }
};


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

    // console.log(typeof this.yum_complete_api_url);
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
        data.map(function(element, index) {
            flavor.push(element.flavors);
            // console.dir($.extend({}, element, beerPairer(index)));
            return _.template(html, $.extend({}, element, beerPairer(index)));
        }).join("");
    };

    // What I want is something like:
    // return _.template(html, $.extend({}, element, if (flavors[i].bitter > 0.15) then styles[0]));
    // 
    // So I will create a function beerPairer
    // 
    // function beerPairer(i){
    // if (flavors[i].bitter > .15){
    //          return styles[0];
    //      } else if (flavors[i].sweet > .15){
    //          return styles[1]
    //      }
    // }

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

    LeftOver.prototype.getBeerStyles = function() {
       // var Beers = []
        return $.getJSON(
            "https://api.brewerydb.com/v2/styles?key=a217c616e466264744fb362e60f8c99f&format=json")
        .then(function(data, second, third){
            // debugger;
            // console.dir(data);
            // console.dir(second);
            // console.dir(third);
            // console.dir(data.data);
            var arrayOfStyles = data.data;
            addBeersToStyles(arrayOfStyles);
            // console.dir(arrayOfStyles);
            // Beers.push(data.data);
            // return data.data;
            return arrayOfStyles;
        });
    }

    // LeftOver.prototype.addBeersToStyles = function(array) {
    //     console.dir(array);
    //     styles.push(array[29], array[89], array[97], array[34]);
    //     console.dir(styles);
    //     return styles;
    // }



    LeftOver.prototype.Routing = function(){
        "use strict";
        var self = this;

        // debugger;
        // getBeerStyles();
        
        // addBeersToStyles(getBeerStyles());
        // Path.map("#/").to(joyRide);

        Path.map("#/results").to(function() {
            $.when(
                self.pullRecipes(),
                self.pullOvenRecipes(),
                self.loadTemplate('recipes'),
                self.loadTemplate('ovenrecipes'),
                self.getBeerStyles()
            ).then(function(yumdata, ovendata, recipeHtml, ovenHtml) {  //data has to be called first because  self.pullRecipes is being brought in first which takes "data", then loadTemplate takes the html
                // debugger;
                // console.log(yumdata)
                // console.log(ovendata)
                self.putRecipeOnPage(yumdata, recipeHtml);
                self.putOvenRecipeOnPage(ovendata, ovenHtml);
                // addBeersToStyles(beerArray);
                console.log(flavor);

            });
        });

        $("#refresh").click(function() {
            $.when(
                self.pullRecipes(),
                self.pullOvenRecipes(),
                self.loadTemplate('recipes'),
                self.loadTemplate('ovenrecipes'),
                self.getBeerStyles()
            ).then(function(yumdata, ovendata, recipeHtml, ovenHtml) {
                self.putRecipeOnPage(yumdata, recipeHtml);
                self.putOvenRecipeOnPage(ovendata, ovenHtml);
                console.log(flavor);

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

//test
