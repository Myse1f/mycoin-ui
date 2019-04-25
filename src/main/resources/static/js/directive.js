var app = angular.module("mycoinUI");


// set echarts directive
app.directive('eChart', function () {
    function link($scope, element, attrs) {
        //初始化图表
        var myChart = echarts.init(element[0]);
        //监控option数据变化
        $scope.$watch(attrs['ecData'], function () {
            var option = $scope.$eval(attrs.ecData);
            if (angular.isObject(option)) {
                //绘制图表
                myChart.setOption(option, true);
            }
        }, true);
        $scope.getDom = function () {
            return {
                'height': element[0].offsetHeight,
                'width': element[0].offsetWidth
            };
        };
        //监控图表宽高变化，响应式
        $scope.$watch($scope.getDom, function () {
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