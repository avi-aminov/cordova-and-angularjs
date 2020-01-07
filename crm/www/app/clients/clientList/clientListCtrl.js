app.controller('clientListCtrl', function (
	$scope, Data, Notification, localStorageService, DTOptionsBuilder, appGetServices) {

	// DataTables configurable options
	$scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(20).withOption('bLengthChange', true);

	$scope.disabledValidator = false;
	//client-status
	appGetServices.getClients(function (data) {
		$scope.clients = data;
	});

	$scope.deleteClient = function (index, id) {
		var  deleteClient = { id: id };
		var isDelete = confirm(translation[_lang].sure_you_want_to_delete_this_product);
		if (isDelete == true) {
			$scope.clients = $scope.clients.filter(function (el) {
				return el.id !== id;
			});
			
			$scope.disabledValidator = true;

			client = id;
			Data.ajaxPost('clients/deleteClient', deleteClient).then(function (results) {
				if (results.status == "success") {
					localStorageService.remove('clients');
					Notification.success({ message: translation[_lang].client_deleted_successfully });
					$scope.disabledValidator = false;
				} else {
					Notification.error({ message: translation[_lang].client_is_not_deleted });
					$scope.disabledValidator = false;
				}
			});
		}
	}
});