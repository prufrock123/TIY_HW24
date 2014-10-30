
_.templateSettings.interpolate = /{([\s\S]+?)}/g;

mocha.setup({
    ui: "bdd",
    ignoreLeaks: true
});

var assert = chai.assert;
var expect = chai.expect;
// require("../js/app.js");

// var yum_options = {
//         app_key: "4164fad3825e0f682dfe82b17b4acf89",
//         app_id: "2e7123cd"
//     };

// var oven_options = {
//         api_key: "dvxVx0d11bD2O2D8z4L627I15fZu05Em"
//     };

describe("recipe", function(){
    var recipe = new LeftOver(yum_options, oven_options);
    describe("#constructor", function(){
        it("should accept two objects as arguments", function(){
            expect(recipe.yum_url).to.equal("http://api.yummly.com/v1/api/recipes?_app_id=");
            expect(recipe.oven_url).to.equal("http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw=")
        })
    })
})


// var yum_options = {
//         app_key: "4164fad3825e0f682dfe82b17b4acf89",
//         app_id: "2e7123cd"
//     };

// var oven_options = {
//         api_key: "dvxVx0d11bD2O2D8z4L627I15fZu05Em"
//     };

// var recipe = new LeftOver(yum_options, oven_options);


// function LeftOver(yum_options, oven_options) {

// 	this.yum_url = "http://api.yummly.com/v1/api/recipes?_app_id=";
//     this.yum_ingredient = "&allowedIngredient[]=";
//     this.yum_course = "&allowedCourse[]=course^course-";
//     this.app_id = yum_options.app_id;    
//     this.app_key = yum_options.app_key;
//     this.yum_complete_api_url = this.yum_url + this.app_id + "&_app_key=" + this.app_key;
// }


// LeftOver.prototype.createInputObject = function() {
//         var input = {};
//         $(':input').each(function(){
//         input[this.name] = this.value;
//         });
//         return input;
// }


// LeftOver.prototype.pullRecipes = function() {

//         var input = this.createInputObject();

//         return $.getJSON(
//             this.yum_complete_api_url + this.yum_ingredient + input.protein + this.yum_ingredient + input.vegetable + this.yum_ingredient + input.carb + this.yum_course + input.course)  
//         .then(function(data){

//             return data.matches;
//         });
    
//     };

// LeftOver.prototype.pullOvenRecipes = function(){
//     "use strict";

//     var input = this.createInputObject();

//     return $.getJSON(
//         this.oven_url + input.protein + "&api_key=" + this.api_key)
//     .then(function(data){
//         console.log(data.Results);
//         return data.Results;
//     });
// };

//--- your setup code goes here (i.e. create test instances of your Constructors)
    //--- your setup code goes here

    //--- your tests go here
    // an example test suite

    // describe("Array", function(){
    //     describe("#indexOf()", function(){
    //         it("should return -1 when the value is not present", function(){
    //             expect([1,2,3].indexOf(5)).to.equal(-1);
    //             expect([1,2,3].indexOf(0)).to.equal(-1);
    //         })
    //     })
    // })



// describe("Spitting out API URL", function(){
// 	it("should tell us whether it's returning a proper string", function(){
// 		expect(recipe.yum_complete_api_url).to.be.a("string");
// 	})
// })


// describe("API and ID Keys", function(){
// 	it("should return the proper Yummly App and ID Keys when object 'Yum Options' we created called", function(){
// 		expect(yum_options.app_key).to.be.a("string");
// 		expect(yum_options.app_id).to.equal("2e7123cd");
// 	})
// 	it("should return proper BigOven API Key when object 'Oven Options' we created called", function(){
// 		expect(oven_options.api_key).to.equal("dvxVx0d11bD2O2D8z4L627I15fZu05Em");
// 	})

// })


// describe("Does this return an object or array?", function(){
// 	it("should tell us whether our function createInputObject returns an object", function(){
// 		expect(LeftOver.prototype.createInputObject()).to.be.a("object");
// 	});
// 	it("should tell us if pullRecipes returns an object", function(){
// 		expect(LeftOver.prototype.pullRecipes()).to.be.a("object");
// 	});
// });

// describe("pulling BigOven recipes", function(){
//     it("should return an array of BigOven recipes", function(){
//         expect(LeftOver.prototype.pullOvenRecipes()).to.be.a("object");
//     });
// });








//--- your tests go here

mocha.globals(["jQuery"]);
mocha.run();

