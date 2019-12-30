app.controller('addClientCtrl', function (
	$scope, $location, $route, $rootScope, Data, Notification, localStorageService, DTOptionsBuilder, appGetServices ) {

	$scope.client = {
		id: appGetServices.generatUniqeId(),
		firstname: '',
		lastname: '',
		birth_date: '',
		gender: null,
		age: '',
		valium: '',
		comment: '',
		email: '',
		website: '',
		phone: '',
		reference: '',
		status: '',
		reg_date: '',
		last_visit_date: '',
	};
	$scope.checkParam = false;
	$scope.disabledValidator = false;

	//client-status
	appGetServices.getClientStatus(function (data) {
		$scope.clientStatus = data;
	});


	
	$scope.saveClient = function (p, andMore) {
		if ($scope.client.firstname == '' || $scope.client.lastname == '' || $scope.client.birth_date == '') {
			$scope.checkParam = true;
			Notification.warning({ message: translation[_lang].missing_parameters  });
		} else {
			$scope.disabledValidator = true;
			console.log($scope.client);
			appGetServices.getClients(function (data) {
		
				let temp;
				if(!data){
					temp = [];
					temp.push($scope.client);
				}else{
					temp = data;
					temp.push($scope.client);
				}
				
				localStorageService.set('clients', temp);
				$location.path('/client-list');
				Notification.success({ message: translation[_lang].update_successful });
				$scope.disabledValidator = false;
			});

			/*
			Data.ajaxPost('clients/addNewClient', p).then(function (results) {
				if (results.status == "success") {
					localStorageService.remove('clients');
					if (andMore) {
						$route.reload();
					} else {
						$location.path('/client-list');
					}
					Notification.success({ message: translation[_lang].update_successful });
					$scope.disabledValidator = false;
				} else {
					Notification.error({ message: translation[_lang].update_successful });
					$scope.disabledValidator = false;
				}
			});
			*/
		}
	};

});