var  app = angular.module("mycoinUI");

app.controller("nodesController", function ($scope, $interval, toaster, mycoinAPI) {

    $scope.refresh = function () {
        mycoinAPI.getNetworkStatus().then(function (value) {
            if (value.code === 111) {
                $scope.networkStatus = value.data.status === "running";
                $scope.btnClass = $scope.networkStatus ? "danger" : "success";
            } else {
                toaster.pop('error', 'error', value.message, 5000);
            }
        });

        mycoinAPI.getPeers().then(function (value) {
            if (value.code === 111) {
                $scope.peers = value.data;
            } else {
                toaster.pop('error', 'error', value.message, 5000);
            }
        })
    };

    $scope.connect = function() {
        mycoinAPI.connectToPeer($scope.address, $scope.port).then(function (value) {
            if (value.code === 111) {

            } else {
                toaster.pop('error', 'error', value.message, 5000);
            }
        });
    };

    $scope.submitConnect = function () {

    };

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