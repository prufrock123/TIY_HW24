_.templateSettings.interpolate = /{([\s\S]+?)}/g;

mocha.setup({
    ui: "bdd",
    ignoreLeaks: true
});

var assert = chai.assert;
var expect = chai.expect;

var recipe = new LeftOver(yum_options, oven_options);

describe("Constructor", function(){

    describe("#Expected base urls", function(){
        it("should accept two objects as arguments", function(){
            expect(recipe.yum_url).to.equal("http://api.yummly.com/v1/api/recipes?_app_id=");
            expect(recipe.oven_url).to.equal("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw=")
        })
    })
    describe("#URL should be a string", function(){
        it("should tell us whether it's returning a proper string", function(){
            expect(recipe.yum_complete_api_url).to.be.a("string");
        })
    })
    describe("#Yummly API and ID keys", function() {
        it("should return the proper Yummly App and ID Keys", function() {
            expect(yum_options.app_key).to.be.a("string");
            expect(yum_options.app_id).to.equal("2e7123cd");
        })
    })
    describe("#BigOven API key", function() {
        it("should return proper BigOven API Key", function() {
            expect(oven_options.api_key).to.equal("dvxVx0d11bD2O2D8z4L627I15fZu05Em");
        })
    })
})


describe("pullRecipes", function(){

})



describe("pullRecipes should return an object", function(){
    it("should tell us if pullRecipes returns an object", function(){
        expect(recipe.pullRecipes()).to.be.a("object");
    });
});

// describe("pulling BigOven recipes", function(){
//     it("should return an array of BigOven recipes", function(){
//         expect(LeftOver.prototype.pullOvenRecipes()).to.be.a("object");
//     });
// });

//  it("should tell us whether our function createInputObject returns an object", function(){
//      expect(LeftOver.prototype.createInputObject()).to.be.a("object");
//  });




mocha.globals(["jQuery"]);
mocha.run();

