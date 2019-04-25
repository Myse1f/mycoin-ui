// get module
var app = angular.module('mycoinUI');

// set route
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        redirectTo: '/home'
    }).when('/home', {
        templateUrl: "views/home.html",
        controller: "homeController"
    }).when('/blocks', {
        templateUrl: "views/blocks.html",
        controller: "blocksController"
    }).when('/block/:hash', {
        templateUrl: "views/block.html",
        controller: "blockController"
    }).otherwise({
        redirectTo: '/home'
    });

}]);