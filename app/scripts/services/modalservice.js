
'use strict';
/* This Factory method will help to generate a modalInstance when used in ng-repeat for showing individual news content based on the item selected
 * Similar to a bootstrap's modal service */
angular.module('ModalService',[])
    .factory('$news',['$modal', function($modal) {
        return {
            openNewsDetailsModal: function(item) {
                var modalInstance = $modal.open({
                    templateUrl: 'views/modal.html',
                    backdrop: 'static',
                    controller: function($scope, $modalInstance, $sce, item) {
                        var entry = {};
                        angular.copy(item, entry);
                        $scope.entry = entry;

                        //$sce service for displaying raw HTML content to the modal view
                        $scope.content = $sce.trustAsHtml($scope.entry.description);
                        $scope.cancel = function() {
                            $modalInstance.dismiss('cancel');
                        };
                        $scope.ok = function() {
                            $modalInstance.close();
                        };
                    },
                    size: 'lg',
                    resolve: {
                        item: function() {
                            return item;
                        }
                    }
                });

            }
        };
    }]);
