var  app = angular.module("mycoinUI");

app.controller("nodesController", function ($scope, toaster, mycoinAPI) {

    $scope.refresh = function () {
        mycoinAPI.getNetworkStatus().then(function (value) {
            if (value.code === 111) {
                $scope.networkStatus = value.data.status === "running";
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

    };

    $scope.refresh();
});