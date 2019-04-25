app.controller('blocksController', function ($scope, mycoinAPI) {

    $scope.initialize = function () {
        $scope.currentPage = 1;
        mycoinAPI.getAllBlocks().then(function (value) {
            if (value.code === 111) {
                splitPage(value.data);
            } else {
                toaster.pop('error', 'error', value.msg, 10000);
            }
        })
    };

    const numberInPage = 100;

    function splitPage(blocks) {
        $scope.pageNumber = Math.floor(blocks.length / numberInPage) + 1;
        $scope.blocksPage = [];
        for (let i = 0; i < $scope.pageNumber; i++) {
            $scope.blocksPage.push(blocks.slice(i * numberInPage, (i + 1) * numberInPage));
        }
    }

    $scope.goFirst = function () {
        $scope.currentPage = 1;
    };

    $scope.goNext = function () {
        if ($scope.currentPage < $scope.pageNumber) {
            $scope.currentPage += 1;
        }
    };

    $scope.goPrev = function () {
        if ($scope.currentPage - 1 > 0) {
            $scope.currentPage += 1;
        }

    };

    $scope.goLast = function () {
        $scope.currentPage = $scope.pageNumber;
    };

    $scope.initialize();
});