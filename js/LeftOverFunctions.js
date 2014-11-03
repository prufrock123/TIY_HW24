var yum_options = {
    app_key: "4164fad3825e0f682dfe82b17b4acf89",
    app_id: "2e7123cd"
};

var oven_options = {
    api_key: "dvxVx0d11bD2O2D8z4L627I15fZu05Em"
};


function LeftOver(yum_options, oven_options) {
    "use strict";
    if (!yum_options.app_key) {
        throw new Error("Not going to work w/o Yummly API key bruh");
    }
    if (!yum_options.app_id) {
        throw new Error("Not going to work w/o Yummly ID key either");
    }

    if (!oven_options.api_key) {
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
}

LeftOver.prototype.createInputObject = function() {
    "use strict";

    var input = {};
    $(':input').each(function() {
        input[this.name] = this.value;
    });

    return input;
};

LeftOver.prototype.pullRecipes = function() {
    "use strict";

    var input = this.createInputObject();
    return $.getJSON(
            this.yum_complete_api_url + this.yum_ingredient + input.protein + this.yum_ingredient + input.vegetable + this.yum_ingredient + input.carb + this.yum_course + input.course)
        .then(function(data) {
            console.log(data);
            return data.matches;
        });
};

LeftOver.prototype.pullOvenRecipes = function() {
    "use strict";

    var input = this.createInputObject();

    return $.getJSON(
            this.oven_url + input.protein + "&api_key=" + this.api_key)
        .then(function(data) {
            console.log(data.Results);
            return data.Results;
        });
};

LeftOver.prototype.loadTemplate = function(template) {
    return $.get('./templates/' + template + '.html').then(function(htmlString) {
        return htmlString;
    });
};

LeftOver.prototype.putRecipeOnPage = function(data, html) {
    "use strict";

    document.querySelector('#recipes').innerHTML =
        data.map(function(element, index) {
            flavor.push(element.flavors);
            return _.template(html, $.extend({}, beerPairer(index), element));
        }).join("");
};

LeftOver.prototype.putOvenRecipeOnPage = function(data, html) {
    "use strict";
    console.log(data);
    console.log(html);
    document.querySelector('#ovenrecipes').innerHTML =
        data.map(function(element) {
            return _.template(html, element);
        }).join("");
};


LeftOver.prototype.getBeerStyles = function() {
    return $.getJSON(
            "https://api.brewerydb.com/v2/styles?key=a217c616e466264744fb362e60f8c99f&format=json")
        .then(function(data, second, third) {
            var arrayOfStyles = data.data;
            addBeersToStyles(arrayOfStyles);
            return arrayOfStyles;
        });
}
