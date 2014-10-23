
_.templateSettings.interpolate = /{([\s\S]+?)}/g;

mocha.setup({
    ui: "bdd",
    ignoreLeaks: true
});

var assert = chai.assert;
var expect = chai.expect;

//--- your setup code goes here (i.e. create test instances of your Constructors)
//--- your setup code goes here

//--- your tests go here
// an example test suite
describe("Array", function(){
    describe("#indexOf()", function(){
        it("should return -1 when the value is not present", function(){
            expect([1,2,3].indexOf(5)).to.equal(-1);
            expect([1,2,3].indexOf(0)).to.equal(-1);
        })
    })
})
//--- your tests go here

mocha.globals(["jQuery"]);
mocha.run();

