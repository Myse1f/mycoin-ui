var app = angular.module('mycoinUI', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        redirectTo: '/home'
    }).
    when('/home', {
        templateUrl: "views/home.html",
        controller: "homeController"
    }).
    otherwise({
        redirectTo: '/home'
    });

}]);

app.controller('homeController', function($scope) {
    $scope.blockNumber = 123;
    $scope.btnClass = "btn-danger";
    $scope.minerStatus = "Start";

    $scope.startStopMiner = function () {
        if ($scope.minerStatus === "Start") {
            $scope.minerStatus = "Stop";
            $scope.btnClass = "btn-success";
        } else {
            $scope.minerStatus = "Start";
            $scope.btnClass = "btn-danger";
        }
    }
});