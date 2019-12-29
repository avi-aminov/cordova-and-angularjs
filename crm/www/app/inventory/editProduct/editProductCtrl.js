app.controller('editProductCtrl', function (
    $scope, $routeParams, $location, Data, Notification, localStorageService, DTOptionsBuilder, appGetServices) {

    $scope.product = {
        sku: '',
        name: '',
        buy_price: '',
        is_vat: '',
        sale_price: '',
        earn: '',
        price_after_vat: '',
        stock_quantity: 0,
        description: '',
        category: '',
        supplier: '',
        status: '',
        is_can_discount: '',
        discount_percent: 0,
        invoic_number: ''
    };

    $scope.disabledValidator = false;


    if ($routeParams.product_id && $routeParams.product_id > 0) {
        id = $routeParams.product_id;
        $scope.disabledValidator = true;
        Data.ajaxPost('products/getProduct', id).then(function (results) {
            if (results.status === "success") {
                if (results.status === "success") {
                    $scope.product = results.product[0];
                    $scope.product.status = ($scope.product.status === 1 ? true : false);
                    $scope.product.is_vat = ($scope.product.is_vat === 1 ? true : false);
                    $scope.product.is_can_discount = ($scope.product.is_can_discount === 1 ? true : false);
                    $scope.product.id = $routeParams.product_id;
                    $scope.disabledValidator = false;
                }
            } else {
                Notification.error({ message: translation[_lang].missing_parameters });
                $scope.disabledValidator = false;
            }
        });
    }

    //inventory-categories
    appGetServices.getProductCategories(function (data) {
        $scope.categories = data;
    });

    //client-Suppliers 
    appGetServices.getProductSuppliers(function (data) {
        $scope.suppliers = data;
    });

    $scope.checkParam = false;
    $scope.updateProduct = function (p) {
        if (p.name == '' || (p.sale_price == '' || p.sale_price == null) || (p.buy_price == '' || p.buy_price == null)) {
            $scope.checkParam = true;
            Notification.error({ message: translation[_lang].missing_parameters });
        } else {
            $scope.disabledValidator = true;
            product = p;
            Data.ajaxPost('products/updateProduct', product).then(function (results) {
                if (results.status == "success") {
                    localStorageService.remove('products');
                    Notification.success({ message:translation[_lang].update_successful });
                    $location.path('/inventory-list');
                    $scope.disabledValidator = false;
                } else {
                    Notification.error({ message: translation[_lang].update_failed });
                    $scope.disabledValidator = false;
                }
            });
        }
    };

    $scope.getDiscountChecked = function () {
        $scope.earnPrice();
        return $scope.product.is_can_discount;
    };

    $scope.earnPrice = function () {
        if ($scope.product.is_can_discount) {
            // חישוב כיש אפשרות להנחות
            if (($scope.product.buy_price != '' && $scope.product.buy_price > 0) && ($scope.product.sale_price != '' && $scope.product.sale_price > 0)) {
                $scope.product.earn = ($scope.product.sale_price - ($scope.product.sale_price * $scope.product.discount_percent / 100)) - $scope.product.buy_price;
            } else {
                $scope.product.earn = '';
            }
        } else {
            // חישוב כשאין הנחות
            if (($scope.product.buy_price != '' && $scope.product.buy_price > 0) && ($scope.product.sale_price != '' && $scope.product.sale_price > 0)) {
                $scope.product.earn = $scope.product.sale_price - $scope.product.buy_price;
            } else {
                $scope.product.earn = '';
            }
        }
    };
});