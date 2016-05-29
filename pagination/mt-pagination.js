angular.module('leapuCenter').directive('mtPagination', function($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            pagination:'=paginationObj'
        },
        templateUrl: 'directive/mt-pagination/mt-pagination.html',
        link: function($scope, element, attrs, fn) {
            $scope.isLast = true;
            $scope.curPage = 0;

            $scope.first=function(){
                if($scope.curPage === 1) {
                    return;
                }
                $scope.pagination.firstPage();
//                $scope.curPage = 1;
            };
            $scope.last=function(){
                if($scope.isLast){
                    return;
                }
                $scope.pagination.lastPage();
//                $scope.curPage = Math.ceil($scope.pagination.totalCount/$scope.pagination.countPerPage);
            };
            $scope.prev = function(){
                if($scope.curPage === 1) {
                    return;
                }
                $scope.pagination.prePage();
//                if($scope.curPage > 1) {
//                    $scope.curPage = $scope.pagination.curPage+1;
//                }
            };
            $scope.next=function(){
                if($scope.isLast){
                    return;
                }
                $scope.pagination.nextPage();
//                if($scope.curPage < Math.ceil($scope.pagination.totalCount/$scope.pagination.countPerPage)) {
//                    $scope.curPage = $scope.pagination.curPage+1;
//                }
            };

            if(!$scope.pagination){
                return;
            }

            $scope.$watch(function(){ return {newCurPage:$scope.pagination.curPage, newTotalCount:$scope.pagination.totalCount}},function(newVal){
                $scope.curPage = newVal.newCurPage +1;
                $scope.isLast =($scope.pagination.curPage === parseInt(($scope.pagination.totalCount-1)/$scope.pagination.countPerPage));

                var index = $scope.pagination.curPage;
                var maxCount = $scope.pagination.totalCount;
                var count = $scope.pagination.countPerPage;
                var pages = [ ];
                pages.push({
                    text: index + 1,
                    index: index+1
                });
                for(var counter = 1; counter != 3; ++counter)
                {
                    if(maxCount/count <= index + 1)
                    {
                        break;
                    }
                    pages.push({
                        text: index + counter + 1,
                        index: index + counter +1
                    });
                    if(maxCount/count <= index + 2)
                    {
                        break;
                    }
                }

                for(var counter = 1; counter != 3; ++counter)
                {
                    if (index - counter < 0)
                        break;

                    pages.unshift({
                        text: index - counter + 1,
                        index: index - counter +1
                    });
                }

                $scope.pages=pages;
            }, true);


            var gotoPageTimer = null;
            $scope.$watch('curPage',function(newCurPage){
                if(gotoPageTimer){
                    $timeout.cancel(gotoPageTimer);
                }
                if(!newCurPage){
                    return;
                }
                if(newCurPage === $scope.pagination.curPage+1 || newCurPage < 1 ||
                    newCurPage > parseInt(($scope.pagination.totalCount-1)/$scope.pagination.countPerPage +1) || !/^[0-9]*$/.test(newCurPage)){
                    $scope.curPage = $scope.pagination.curPage+1;
                    return;
                }else {
                    gotoPageTimer = $timeout(function(){
                        $scope.gotoPage(newCurPage - 1);
                        return null;
                    },2000);

                }
            });

            $scope.gotoPage = function(page){
                $scope.pagination.gotoPage(page);

            };

//            $scope.pagination.totalCount;
//            $scope.pagination.countPerPage;
            $scope.pageCount = ($scope.pagination.totalCount-1)/$scope.pagination.countPerPage+1;


        }
    };
});
