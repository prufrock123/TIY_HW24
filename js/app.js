
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
        $(document).foundation('joyride', 'start');
        // start app?
        
    // var recipe = new leftOver(options);

    })

}

// function leftOver(options) {
//     if (!options.api_key) {
//         throw new Error("Not going to work w/o API key brah");
//     };
// }



// leftOver.prototype.Routing = function(){
//     var self = this;

//     Path.map("#/").to(
//     });

//     Path.map("#/results").to(function() {
//         $.when(

//         ).then(function () {

//         });
//     });
// }


