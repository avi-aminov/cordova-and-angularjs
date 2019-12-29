app.controller('addProductCtrl', function (
    $scope, $location, $route, Data, Notification, localStorageService, DTOptionsBuilder, appGetServices) {

    //inventory-categories
    appGetServices.getProductCategories(function (data) {
        $scope.categories = data;
    });

    //client-Suppliers 
    appGetServices.getProductSuppliers(function (data) {
        $scope.suppliers = data;
    });

    $scope.disabledValidator = false;

    $scope.product = {
        sku: '',
        name: '',
        buy_price: '',
        is_vat: true,
        sale_price: '',
        earn: 0,
        price_after_vat: 0,
        stock_quantity: 1,
        description: '',
        category: '',
        supplier: '',
        status: true,
        is_can_discount: true,
        discount_percent: 0,
        invoic_number: ''
    };

    // general-settings
    appGetServices.getGeneralSettings(function (data) {
        $scope.vat = data.vat;
    });

    $scope.priceAfterVat = function (buy_price = $scope.product.buy_price) {
        if (buy_price == '' || buy_price == null) {
            $scope.product.price_after_vat = 0;
        } else {
            if($scope.product.is_vat && $scope.product.is_vat != null){
                $scope.product.price_after_vat = null;
                $scope.product.price_after_vat = parseFloat(buy_price) + ((parseFloat(buy_price) * parseFloat($scope.vat)) / 100);
                $scope.product.price_after_vat = $scope.product.price_after_vat.toFixed(2);
            }else{
                  $scope.product.price_after_vat = buy_price;
            }
        }
    };


    $scope.getDiscountChecked = function () {
        $scope.earnPrice();
        return $scope.product.is_can_discount;
    };

    $scope.getVatChecked = function () {
        $scope.priceAfterVat();
        return $scope.product.is_vat;
    };

    $scope.earnPrice = function () {
        if ($scope.product.is_can_discount) {
            // חישוב כיש אפשרות להנחות
            if (($scope.product.buy_price != '' && $scope.product.buy_price > 0) && ($scope.product.sale_price != '' && $scope.product.sale_price > 0)) {
                $scope.product.earn = ($scope.product.sale_price - ($scope.product.sale_price * $scope.product.discount_percent / 100)) - $scope.product.buy_price;
                $scope.product.earn = $scope.product.earn.toFixed(2);
            } else {
                $scope.product.earn = '';
            }
        } else {
            // חישוב כשאין הנחות
            if (($scope.product.buy_price != '' && $scope.product.buy_price > 0) && ($scope.product.sale_price != '' && $scope.product.sale_price > 0)) {
                $scope.product.earn = $scope.product.sale_price - $scope.product.buy_price;
                $scope.product.earn = $scope.product.earn.toFixed(2);
            } else {
                $scope.product.earn = '';
            }
        }
    };

    $scope.checkParam = false;
    $scope.saveProduct = function (p, andMore) {
        if (
            $scope.product.name == '' || $scope.product.sku == '' ||
            ($scope.product.sale_price == '' || $scope.product.sale_price == null) ||
            ($scope.product.buy_price == '' || $scope.product.buy_price == null)
        ) {
            $scope.checkParam = true;
            Notification.warning({ message: translation[_lang].missing_parameters });
        } else {
            $scope.disabledValidator = true;
            var product = p;
            Data.ajaxPost('products/addNewProduct', product).then(function (results) {
                if (results.status === "success") {
                    localStorageService.remove('products');
                    if (andMore) {
                        $scope.disabledValidator = false;
                        $route.reload();
                    } else {
                        $location.path('/inventory-list');
                    }
                    Notification.success({ message: translation[_lang].product_saved_successfully });
                    $scope.disabledValidator = false;
                } else {
                    Notification.error({ message: translation[_lang].product_is_not_saved });
                }
            });
        }
    };
});