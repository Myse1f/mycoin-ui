var app = angular.module("mycoinUI");

// service for api request
app.service('mycoinAPI', function ($http, $q) {

    this.getBlock = function (hash) {
        var deferred = $q.defer();
        $http.get('/mycoin-ui/block/' + hash).then(
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
        $http.get('/mycoin-ui/recentblocks/').then(
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
        $http.get('/mycoin-ui/allblocks/').then(
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
        $http.get('/mycoin-ui//miner/').then(
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
        $http.patch('/mycoin-ui/miner/', null).then(
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
        $http.delete('/mycoin-ui/miner/').then(
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
        $http.get('/mycoin-ui/peers/').then(
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
        $http.patch('/mycoin-ui/peer/', null, config).then(
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

        $http.get('/mycoin-ui/network/',).then(
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

        $http.patch('/mycoin-ui/network/', null).then(
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

        $http.delete('/mycoin-ui/network/',).then(
            function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject('error');
            }
        );

        return deferred.promise;
    }
});