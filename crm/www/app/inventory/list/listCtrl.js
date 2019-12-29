app.controller('listCtrl', function (
	$scope, Data, Notification, localStorageService, DTOptionsBuilder, appGetServices) {

	// DataTables configurable options
	$scope.dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(20).withOption('bLengthChange', true);

	//$scope.products = [];
	appGetServices.getProductsList(function (data) {
		$scope.products = data;
	});

	$scope.deleteProduct = function (index, p) {
		var deleteProduct = { id: p.id };
		var isDelete = confirm(translation[_lang].sure_you_want_to_delete_this_product + " : " + p.sku);
		if (isDelete == true) {
			$scope.products = $scope.products.filter(function (el) {
				return el.id !== p.id;
			});

			var product = deleteProduct;
			Data.ajaxPost('products/deleteProduct', product).then(function (results) {
				if (results.status == "success") {
					localStorageService.remove('products');
					Notification.success({ message: translation[_lang].product_deleted_successfully });
				} else {
					Notification.error({ message: translation[_lang].product_not_deleted });
				}
			});
		}
	}


	$scope.updateStatus = function (id, status) {
	

		var product = {
			id:id,
			status: (status == '1' || status == 1 || status == true ? false : true)
		};

		console.log(product);

    	Data.ajaxPost('products/updateStatus', product).then(function (results) {
            if (results.status == "success") {
				localStorageService.remove('products');
				Notification.success({ message: translation[_lang].update_successful });
			} else {
				Notification.error({ message: translation[_lang].update_failed });
			}
        });
	}

	$scope.quantityAction = function (index, id, action) {
		var update = true;

		if (action == 'plus') {
			$scope.products[index].stock_quantity = parseInt($scope.products[index].stock_quantity) + 1;
		} else {
			if($scope.products[index].stock_quantity > 0){
				$scope.products[index].stock_quantity = parseInt($scope.products[index].stock_quantity) - 1;
			}else{
				update = false;
			}
		}

		if(update){
			var updateProduct = {
				id: id, stock_quantity: $scope.products[index].stock_quantity
			};
			product = updateProduct;
			Data.ajaxPost('products/updateStockQuantity', product).then(function (results) {
				if (results.status == "success") {
					localStorageService.remove('products');
					Notification.success({ message: translation[_lang].update_successful });
				} else {
					Notification.error({ message: translation[_lang].update_failed });
				}
			});
		}
	};

	// ToDoo 
	angular.element(document).ready(function () {
		angular.element("#dynamic-table_filter label").contents().filter(function () {
			return this.nodeType === 3; 
		}).remove();
    });
});