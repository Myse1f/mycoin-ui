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
    // var urlPrefix = 'http://127.0.0.1:8081/mycoin/api/';
    var urlPrefix = 'http://101.132.161.125:8081/mycoin/api/';

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
});

// set echarts directive
app.directive('eChart', function() {
    function link($scope, element, attrs) {
    	//初始化图表
        var myChart = echarts.init(element[0]);
        //监控option数据变化
        $scope.$watch(attrs['ecData'], function() {
            var option = $scope.$eval(attrs.ecData);
            if (angular.isObject(option)) {
            	//绘制图表
                myChart.setOption(option, true);
            }
        }, true);
        $scope.getDom = function() {
            return {
                'height': element[0].offsetHeight,
                'width': element[0].offsetWidth
            };
        };
        //监控图表宽高变化，响应式
        $scope.$watch($scope.getDom, function() {
            // resize echarts图表
            myChart.resize();
        }, true);
    }
    return {
    	//A 作为属性使用
        restrict: 'A',
        link: link
    };
});

// set controller
app.controller('homeController', function($scope, $filter, $interval, mycoinAPI) {
    $scope.blockNumber = 123;

    $scope.startStopMiner = function () {
        if ($scope.minerStatus) {
            let promise = mycoinAPI.stopMiner();
            promise.then(function (value) {
                if (value.code === 111) {
                    $scope.minerStatus = value.data.status === 'running';
                    $scope.btnClass = "btn-success";
                } else {
                    console.log(value.msg);
                }
            });
        } else {
            let promise = mycoinAPI.startMiner();
            promise.then(function (value) {
                if (value.code === 111) {
                    $scope.minerStatus = value.data.status === 'running';
                    $scope.btnClass = "btn-danger";
                } else {
                    console.log(value.msg);
                }
            })
        }
    };


    // echarts option
    $scope.echartsOption = {
        title: {
            text: 'Block height/Time'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return $filter('date')(date.getTime(), 'yyyy-MM-dd HH:mm:ss') + '  ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            scale: true,
            splitLine: {
                show: false
            }
        },
        series: [{
            type: 'line',
            showSymbol: false,
            hoverAnimation: false
        }]
    };

    $scope.blocks2EcData = function() {
        const ecData = [];
        for (const block of $scope.blocks) {
            const now = new Date(block.time*1000);
            ecData.push({
                name: now.toString(),
                value: [
                    $filter('date')(now.getTime(), 'yyyy-MM-dd HH:mm:ss'),
                    block.height
                ]
            });
        }
        return ecData;
    };

    $scope.refresh = function () {
        let promise = mycoinAPI.getRecentBlocks();
        console.log("Refresh...");
        promise.then(function (value) {
            if (value.code === 111) {
                $scope.blocks = value.data;
                $scope.ecData = $scope.blocks2EcData();
                $scope.ecData.reverse();
                $scope.echartsOption.series[0].data = $scope.ecData;
                console.log($scope.ecData);
            } else {
                console.log(value.msg);
            }
        });

        promise = mycoinAPI.getMinerStatus();
        promise.then(function (value) {
            if (value.code === 111) {
                $scope.minerStatus = value.data.status;
                $scope.btnClass = $scope.minerStatus ? "btn-danger" : "btn-success";
            } else {
                console.log(value.msg);
            }
        })
    };

    // first refresh the blocks data
    $scope.refresh();

    // set timer, refresh every 1 minutes
    var timer;
    if (!angular.isDefined(timer)) {
        timer = $interval(function() {
            $scope.refresh();
        }, 60*1000);
    } else {
        $interval.cancel(timer);
    }
    $scope.$on("$destroy", function() {
        $interval.cancel(timer);
    });

});