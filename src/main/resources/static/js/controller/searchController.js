var app = angular.module("mycoinUI");

app.controller("searchController", function ($scope, $location) {

    $scope.submitSearch = function () {
        $location.url('/block/' + $scope.searchHash.toLowerCase());
        $scope.searchHash = '';
    }
});