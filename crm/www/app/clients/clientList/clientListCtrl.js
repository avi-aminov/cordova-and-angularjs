app.controller('clientListCtrl', function (
	$scope, $location, $rootScope, Notification, localStorageService, DTOptionsBuilder, appGetServices) {

	// DataTables configurable options
	$scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(20).withOption('bLengthChange', true);

	$scope.disabledValidator = false;
	//client-status
	appGetServices.getClients(function (data) {
		$scope.clients = data;
	});

	$scope.editClient = function(index, id){
		$location.path(`/edit-client/${id}`); 
	};

	$scope.clientStatus = function(index, id){
		$location.path(`/client-statistics/${id}`); 
	};

	$scope.deleteClient = function (index, id) {
		var isDelete = confirm(translation[_lang].sure_you_want_to_delete_this_product);
		if (isDelete == true) {
			var deleteSuccessfully = false;
			$scope.clients = $scope.clients.filter(function (el) {
				if(el.id !== id){
					deleteSuccessfully = true;
					return true;
				}else{
					return false;
				}
			});
			
			$scope.disabledValidator = true;
			localStorageService.set('clients', $scope.clients);

			if(deleteSuccessfully){
				Notification.success({ message: translation[_lang].client_deleted_successfully });
				$scope.disabledValidator = false;
			}else{
				Notification.error({ message: translation[_lang].client_is_not_deleted });
				$scope.disabledValidator = false;
			}
		}
	}
});