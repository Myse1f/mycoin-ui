var app = angular.module("mycoinUI");

// service for api request
app.service('mycoinAPI', function ($http, $q) {
    // var urlPrefix = 'http://127.0.0.1:8081/mycoin/api/';
    var urlPrefix = 'http://101.132.161.125:8081/mycoin/api/';

    this.getBlock = function (hash) {
        var deferred = $q.defer();
        $http.get(urlPrefix + 'block/' + hash).then(
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
        $http.get(urlPrefix + 'recentblocks/').then(
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
        $http.get(urlPrefix + 'allblocks/').then(
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
        $http.get(urlPrefix + 'miner/').then(
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
        $http.patch(urlPrefix + 'miner/', null).then(
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
        $http.delete(urlPrefix + 'miner/').then(
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
        $http.get(urlPrefix + 'peers/').then(
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
        $http.patch(urlPrefix + 'miner/', null, config).then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    };

    this.getNetworkStatus = function () {
        var deferred = $q.defer();

        $http.get(urlPrefix + 'network/',).then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    };

    this.startNetwork = function () {
        var deferred = $q.defer();

        $http.patch(urlPrefix + 'network/', null).then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    };

    this.stopNetwork = function () {
        var deferred = $q.defer();

        $http.delete(urlPrefix + 'network/',).then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    }
});