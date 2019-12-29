app.controller('saleCtrl', function (
	$scope, Data, Notification, localStorageService, DTOptionsBuilder, appGetServices) {

	//$scope.dashboard = true;
	$scope.ac_clients = [];
	$scope.disabledValidator = false;
	$scope.showClients = function () {
		$scope.clients.forEach(function (value, key) {
			$scope.ac_clients.push({name: value.firstname + " " + value.lastname , id: value.id});
		});
	};

	appGetServices.getProductsList(function (data) {
		$scope.products = data;
	});

	appGetServices.getClients(function (data) {
		$scope.clients = data;
        $scope.showClients();
	});

	// general-settings
    appGetServices.getGeneralSettings(function (data) {
        $scope.vat = data.vat;
    });

	$scope.setPurchase = function (WithoutClient) {
		if(!WithoutClient){
			if(	$scope.saleProductList.length > 0 && 
					$scope.selectedClient && 
						$scope.selectedClient.originalObject && 
							$scope.selectedClient.originalObject.id)
			{
				user = { userID: $scope.selectedClient.originalObject.id };
				$scope.disabledValidator = true;
			}else{
				Notification.error({ message: translation[_lang].missing_parameters });
				return;
			}
		}else{
			if(	$scope.saleProductList.length > 0){
				user = { userID: -1 };
				$scope.disabledValidator = true;
			}else{
				Notification.error({ message: translation[_lang].missing_parameters });
				return;
			}
		}
		var saleProducts = { p: $scope.saleProductList, user: user }
		Data.ajaxPost('purchase/newPurchase', saleProducts).then(function (results) {
			if (results.status == "success") {
				localStorageService.remove('clients');
				Notification.success({ message: translation[_lang].inventory_is_updated });
				$scope.saleProductList = [];

				/* TODO */
				appGetServices.clearAll(function(){});
				/* *** */

				$scope.disabledValidator = false;

			} else {
				Notification.error({ message: translation[_lang].inventory_not_updated });
				$scope.disabledValidator = false;
			}
		});
	};

 	$scope.saleProductList = [];
    if (localStorageService.get('sale-list')) {
         $scope.saleProductList = localStorageService.get('sale-list');
    }else{
        $scope.saleProductList = [];
    }
	
    $scope.deleteThisPurchase = function(){
        localStorageService.set('sale-list', []);
        $scope.saleProductList = [];
    }
	

    $scope.returnsThisPurchase = function(){
		if($scope.saleProductList && $scope.saleProductList.length > 0 ){
			$scope.disabledValidator = true;

			var saleProducts = { p: $scope.saleProductList}

			Data.ajaxPost('purchase/newReturns', saleProducts).then(function (results) {
				if (results.status == "success") {
					localStorageService.remove('clients');
					Notification.success({ message: translation[_lang].inventory_is_updated });
					$scope.saleProductList = [];

					/* TODO */
					appGetServices.clearAll(function(){});
					/* *** */

					$scope.disabledValidator = false;

				} else {
					Notification.error({ message: translation[_lang].inventory_not_updated });
					$scope.disabledValidator = false;
				}
			});
		}else{
			Notification.error({ message: translation[_lang].missing_parameters });
		}
    }


	$scope.stockQuantityFilter = function(element) {
		if(element.stock_quantity > 0){
			if($scope.saleProductList.length > 0){
				for (var i = 0; i < $scope.saleProductList.length; i++) {
					if ($scope.saleProductList[i].sku == element.sku) {
						return (element.stock_quantity - $scope.saleProductList[i].stock_quantity) < 1 ? false : true;
					}else{
						return true;
					}
				}
			}else{
				return true;
			}
		}else{
			return false;
		}
	};


	$scope.addProduct = function (product) {
		var update = false;
		for (var i = 0; i < $scope.saleProductList.length; i++) {
			if ($scope.saleProductList[i].sku == product.sku) {
				$scope.saleProductList[i].stock_quantity = parseInt($scope.saleProductList[i].stock_quantity) + 1;
				update = true;
				break;
			}
		}

		var add = {
			product_id: product.id,
            sku: product.sku,
            product_name: product.name,
			is_can_discount: product.is_can_discount,
			buy_price: product.buy_price,
			sale_price: product.sale_price,
			earn: product.earn,
			discount_percent: product.discount_percent,
			stock_quantity: 1,
			is_vat:  product.is_vat,
            vat: $scope.vat,
            supplier: product.supplier,
            category: product.category,
		};

		if (!update) {
			$scope.saleProductList.push(add);
		}
        localStorageService.set('sale-list', $scope.saleProductList);
	};

	$scope.ngModelOptionsSelected = function (value) {
		if (arguments.length) {
			_selected = value;
		} else {
			return _selected;
		}
	};

	$scope.reset = function () {
		$scope.state = undefined;
	};


	$scope.quantityAction = function (index, id, action, product) {

		
		
		if (action == 'plus') {

			for (var i = 0; i < $scope.products.length; i++) {
				if ($scope.products[i].sku == product.sku) {
					if(($scope.products[i].stock_quantity - product.stock_quantity) < 1 ){
						return false
					}
				}
			}


			$scope.saleProductList[index].stock_quantity = parseInt($scope.saleProductList[index].stock_quantity) + 1;
		} else {
			if ($scope.saleProductList[index].stock_quantity > 1) {
				$scope.saleProductList[index].stock_quantity = parseInt($scope.saleProductList[index].stock_quantity) - 1;
			}
		}
		localStorageService.set('sale-list', $scope.saleProductList);
	};

	$scope.deleteProduct = function (index, p) {
		var isDelete = confirm(translation[_lang].sure_you_want_to_delete_this_product);
		if (isDelete == true) {
			for (i = 0; i < $scope.saleProductList.length; i++) {
				if ($scope.saleProductList[i].sku == p.sku) {
					$scope.saleProductList.splice(i, 1);
					localStorageService.set('sale-list', $scope.saleProductList);
					return false;
				}
			}
		}
	}
});