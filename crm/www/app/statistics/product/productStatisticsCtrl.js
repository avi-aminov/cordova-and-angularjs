app.controller('productStatisticsCtrl', function ($scope, $routeParams, Data, Notification, DTOptionsBuilder, appGetServices) {

	$scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(10).withOption('bLengthChange', true);
	$scope.dtLastVisitOptions = DTOptionsBuilder.newOptions().withDisplayLength(5).withOption('bLengthChange', false);
	$scope.product_id = $routeParams.product_id;
	$scope.labels = [];
	$scope.data = [];

	$scope.getProductByUserList = function () {
		var result = {};
		if ($scope.products) {
			angular.forEach($scope.products, function (entry) {
				if ($scope.product_id == entry.product_id) {
					var key = entry.c_user_id;
					if (result.hasOwnProperty(key)) {
						result[key].product_count = result[key].product_count + entry.product_count;
					} else {
						result[entry.c_user_id] = JSON.parse(JSON.stringify(entry));
					}
				}
			});
		}
		return result;
	}

	$scope.drawResult = function () {
		var userProductList = $scope.getProductByUserList();
		angular.forEach(userProductList, function (entry) {
			$scope.labels.push(entry.lastname + ' ' + entry.firstname);  // {{product.lastname}} {{product.firstname}}
			$scope.data.push(entry.product_count);
		});
	};


	appGetServices.getProductStatisticsList($scope.product_id, function (data) {
		$scope.products = data;
		$scope.drawResult();
	});


	
	appGetServices.getProductReturns($scope.product_id, function (data) {
		$scope.returns = data;
	});



});