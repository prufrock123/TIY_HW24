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
}

LeftOver.prototype.pullRecipes = function() {

    var input = this.createInputObject();
    return $.getJSON(
        this.yum_complete_api_url + this.yum_ingredient + input.protein + this.yum_ingredient 
        + input.vegetable + this.yum_ingredient + input.carb + this.yum_course + input.course)  
    .then(function(data){
        return data.matches;
    });
};








