// set home controller
var app = angular.module("mycoinUI");

app.controller('homeController', function ($scope, $filter, $interval, mycoinAPI) {

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

    $scope.blocks2EcData = function () {
        const ecData = [];
        for (const block of $scope.blocks) {
            const now = new Date(block.time * 1000);
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
                $scope.blocksNumber = $scope.blocks[0].height + 1;
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
        timer = $interval(function () {
            $scope.refresh();
        }, 60 * 1000);
    } else {
        $interval.cancel(timer);
    }
    $scope.$on("$destroy", function () {
        $interval.cancel(timer);
    });

});