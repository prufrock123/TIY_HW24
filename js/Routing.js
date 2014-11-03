Routing = function() {
    "use strict";

    var self = this;
    Path.map("#/results").to(function() {
        $.when(
            self.pullRecipes(),
            self.pullOvenRecipes(),
            self.loadTemplate('recipes'),
            self.loadTemplate('ovenrecipes'),
            self.getBeerStyles()
        ).then(function(yumdata, ovendata, recipeHtml, ovenHtml) {
            self.putRecipeOnPage(yumdata, recipeHtml);
            self.putOvenRecipeOnPage(ovendata, ovenHtml);
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
