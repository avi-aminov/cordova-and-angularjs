app.controller('editClientCtrl', function (
	$scope, $routeParams,  $window, $location, $route, Data, Notification, localStorageService, DTOptionsBuilder, appGetServices ) {

	$scope.client = {
		firstname: '',
		lastname: '',
		birth_date: '',
		gender: 'זכר',
		age: '',
		valium: '',
		comment: '',
		email: '',
		website: '',
		phone: '',
		facebook: '',
		status: '',
		reg_date: '',
		last_visit_date: '',
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

	//client-status
	appGetServices.getClientStatus(function (data) {
		$scope.clientStatus = data;
	});

	$scope.checkParam = false;
	$scope.updateClient = function (p) {
		if ($scope.client.firstname == '' || $scope.client.lastname == '' || $scope.client.birth_date == '') {
			$scope.checkParam = true;
			Notification.warning({ message: translation[_lang].missing_parameters });
		} else {
			client = p;
			Data.ajaxPost('clients/updateClient', client).then(function (results) {
				if (results.status == "success") {
					localStorageService.remove('clients');
					Notification.success({ message: translation[_lang].update_successful });
					//$location.path('/client-list');
					$window.history.back();
				} else {
					Notification.error({ message: translation[_lang].update_failed });
				}
			});
		}
	};

});