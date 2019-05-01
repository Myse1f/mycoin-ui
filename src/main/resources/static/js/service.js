var app = angular.module("mycoinUI");

// service for api request
app.service('mycoinAPI', function ($http, $q) {

    this.getBlock = function (hash) {
        var deferred = $q.defer();
        $http.get('/block/' + hash).then(
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
        $http.get('/recentblocks/').then(
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
        $http.get('/allblocks/').then(
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
        $http.get('/miner/').then(
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
        $http.patch('/miner/', null).then(
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
        $http.delete('/miner/').then(
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
        $http.get('/peers/').then(
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
        $http.patch('/peer/', null, config).then(
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

        $http.get('/network/',).then(
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

        $http.patch('/network/', null).then(
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

        $http.delete('/network/',).then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    }
});