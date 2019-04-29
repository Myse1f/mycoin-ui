var app = angular.module("mycoinUI");

app.controller("blockController", function ($scope, $routeParams, $filter, toaster, mycoinAPI) {
    $scope.block = {};
    $scope.block.height = '';

    $scope.initialize = function () {
        mycoinAPI.getBlock($routeParams.hash).then(function (value) {
            if (value.code === 111) {
                $scope.block = value.data;
                $scope.block.time = $filter('date')($scope.block.time*1000, 'yyyy-MM-dd HH:mm:ss') + ' UTC';
            } else {
                toaster.pop('warning', 'warning', value.message, 3000);
            }
        });
    };

    $scope.initialize();
});