app.controller('clientStatisticsCtrl', function ($scope, $routeParams,localStorageService, appGetServices, Data, Notification, DTOptionsBuilder) {

	$scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(10).withOption('bLengthChange', true);
	$scope.dtLastVisitOptions = DTOptionsBuilder.newOptions().withDisplayLength(5).withOption('bLengthChange', false);
	$scope.client_id = $routeParams.client_id;
	$scope.labels = [];
	$scope.data = [];

	
	
	 $scope.settingTab = 0;
    $scope.setSettingTab = function (newTab) {
        $scope.settingTab = newTab;
    };

    $scope.settingTabIsSet = function (tabNum) {
        return $scope.settingTab === tabNum;
    };

    $scope.stockSettingTab = 1;
    $scope.stockSetSettingTab = function (newTab) {
        $scope.stockSettingTab = newTab;
    };
	
	
	
	$scope.getUserProductList = function () {
		var result = {};
		if ($scope.purchases) {
			angular.forEach($scope.purchases, function (entry) {
				if ($scope.client_id == entry.c_user_id) {
					var key = entry.sku;
					if (result.hasOwnProperty(key)) {
						result[key].product_count = result[key].product_count + entry.product_count;
					} else {
						result[entry.sku] = JSON.parse(JSON.stringify(entry));
					}
				}
			});
		}
		return result;
	}

	$scope.drawResult = function () {
		var userProductList = $scope.getUserProductList();
		angular.forEach(userProductList, function (entry) {
			$scope.labels.push(entry.product_name);
			$scope.data.push(entry.product_count);
		});
	};

	appGetServices.getStatisticsListByClient($scope.client_id, function (data) {
		$scope.purchases = data;
		$scope.drawResult();
	});


	appGetServices.getLastClientVisits($scope.client_id, function (data) {
		$scope.lastVisits = data;
	});

	$scope.labels2 = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
	$scope.series2 = ['סה"כ'];

	$scope.data2 = [
		[59, 80, 81, 56, 55, 67, 59, 80, 81, 56, 55, 29]
	];


	function ReverseObject(Obj){
		var TempArr = [];
		var NewObj = [];
		for (var Key in Obj){
			TempArr.push(Key);
		}
		for (var i = TempArr.length-1; i >= 0; i--){
			NewObj[TempArr[i]] = [];
		}
		return NewObj;
	}



	//$scope.tracking = [];
	appGetServices.getClientTrackings($scope.client_id, function (data) {
		$scope.tracking = data;
	});


	$scope.saveNewTracking = function(trackingText){
		if(trackingText && trackingText != ''){
			var track = {
				text:trackingText,
				client_id:$scope.client_id
			}
			Data.ajaxPost('statistics/addClientTracking', track).then(function (results) {
				if (results.status == "success") {
					localStorageService.remove('client-tracking-'+$scope.client_id);
					$scope.trackingText = '';
					Notification.success({ message: translation[_lang].update_successful });
						//$scope.tracking = [];
						appGetServices.getClientTrackings($scope.client_id, function (data) {
							$scope.tracking =  data;
						});
				} else {
					Notification.error({ message: translation[_lang].update_successful });
				}
			});
		}
	};

	if ($routeParams.client_id && $routeParams.client_id > 0) {
		client = $routeParams.client_id;
		Data.ajaxPost('clients/getClient', client).then(function (results) {
			if (results.status == "success") {
				$scope.client = results.client[0];
				$scope.client.id = $routeParams.client_id;
			}
		});
	}


	$scope.back = function () {
		$window.history.back();
	};



});