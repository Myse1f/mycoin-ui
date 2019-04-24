// get module
var app = angular.module('mycoinUI', ['ngRoute']);

// set route
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

// service for api request
app.service('mycoinAPI', function ($http, $q) {
    var urlPrefix = 'http://127.0.0.1:8081/mycoin/api/';

    this.getBlock = function (hash) {
        var deferred = $q.defer();
        $http.get(urlPrefix+'block/'+hash).then(
          function successCallback(response) {
              deferred.resolve(response.data);
          }, function errorCallback(response) {
              deferred.reject('error');
          }
        );
        return deferred.promise;
    };

    this.getRecentBlocks = function () {
        var deferred = $q.defer();
        $http.get(urlPrefix+'recentblocks/').then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    };

    this.getAllBlocks = function () {
        var deferred = $q.defer();
        $http.get(urlPrefix+'allblocks/').then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );
        return deferred.promise;
    };

    this.getMinerStatus = function () {
        var deferred = $q.defer();
        $http.get(urlPrefix+'miner/').then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    };

    this.startMiner = function () {
        var deferred = $q.defer();
        $http.patch(urlPrefix+'miner/', null).then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    };

    this.stopMiner = function () {
        var deferred = $q.defer();
        $http.delete(urlPrefix+'miner/').then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    };

    this.getPeers = function () {
        var deferred = $q.defer();
        $http.get(urlPrefix+'peers/').then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    };

    this.connectToPeer = function (address, port) {
        var deferred = $q.defer();
        var config = {
            params: {
                address: address,
                port: port
            }
        };
        $http.patch(urlPrefix+'miner/', null, config).then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    };
    // return {
    //     getBlock: this.getBlock,
    //     getRecentBlocks: this.getRecentBlocks,
    //     getAllBlocks: this.getAllBlocks,
    //     getMinerStatus: this.getMinerStatus,
    //     startMiner: this.startMiner,
    //     stopMiner: this.stopMiner,
    //     getPeers: this.getPeers,
    //     connectToPeer: this.connectToPeer
    // }
});

// set controller
app.controller('homeController', function($scope, mycoinAPI) {
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
    };

    $scope.refresh = function () {
        var promise = mycoinAPI.getRecentBlocks();

        promise.then(function (value) {
            if (value.code === 111) {
                $scope.blocks = value.data;
            } else {
                console.log(value.msg);
            }
        });

    };

    $scope.refresh();

});