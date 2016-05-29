angular.module('leapuCenter').factory('PaginationService',function() {

    var paginationService = function(fetchFunction,pageSize){
        var pagination = {
            curPage:0,
            curPageItems:[],
            totalCount:0,
            countPerPage:pageSize || 15,

            gotoPage:function(page){
                //from 1 to last;
                var value = Math.floor(this.totalCount/this.countPerPage);
                if(this.totalCount%this.countPerPage === 0 && value !== 0){
                    value--;
                }
                if(page <0 || page > value){
                    return false;
                }else{
                    var self = this;
                    self.curPage = page;
                    fetchFunction(page,self.countPerPage,function(items,getResponseHeaders){
                        var headLink = getResponseHeaders('Link');
                        var linkMap ={};
                        self.curPageItems = items;
                        //解析link，找到总条目数。放到totalCount 里面
                        if(headLink !== null && headLink !== undefined){
                            var str = headLink.split(",");
                            for(var i in str){
                                if(i != 'remove'){
                                    var s = str[i].split(";");
                                    if(s.length === 2){
                                        var t = s[1].split("=");
                                        linkMap[t[1].substring(1,t[1].length - 1)] = s[0].substring(1,s[0].length - 1);
                                    }
                                }
                            }
                            self.totalCount = linkMap.count || 0;
                        }
                    });
                    return true;
                }
            },
            nextPage:function(){
                this.gotoPage(this.curPage+1);
            },
            prePage:function(){
                this.gotoPage(this.curPage-1);
            },
            firstPage:function(){
                this.gotoPage(0);
            },
            lastPage:function(){
                var value = Math.floor(this.totalCount/this.countPerPage);
                if(value===this.totalCount/this.countPerPage){
                    value--;
                }
                this.gotoPage(value);
            }

        };
        pagination.gotoPage(0);

        return pagination;
    };


    return paginationService;
});