app.controller('settingCtrl', function ($scope,
    $rootScope, $routeParams, $location, $http, Data, Notification, localStorageService, DTOptionsBuilder, appGetServices
) {

    $scope.disabledValidator = false;

    $scope.settingTab = 3;
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

    $scope.stockSettingTabIsSet = function (tabNum) {
        return $scope.stockSettingTab === tabNum;
    };

    $scope.userSettingTab = 0;
    $scope.userSetSettingTab = function (newTab) {
        $scope.userSettingTab = newTab;
    };

    $scope.userSettingTabIsSet = function (tabNum) {
        return $scope.userSettingTab === tabNum;
    };


    //inventory-categories
    appGetServices.getProductCategories(function (data) {
        $scope.categories = data;
    });

    $scope.addNewCategory = function () {
        Data.ajaxPost('setting/addCategory', {}).then(function (results) {
            if (results.status === "success") {
                $scope.categories.push({
                    'id': results.id
                });
                localStorageService.remove('inventory-categories', $scope.categories);
                Notification.success({ message: translation[_lang].category_deleted_successfully });
            } else {
                Notification.error({ message: translation[_lang].supplier_is_not_deleted });
            }
        });
    };

    $scope.saveCategoryChange = function (id, name) {
        var category = {
            id: id,
            name: name
        };
        Data.ajaxPost('setting/updateCategory', category).then(function (results) {
            if (results.status === "success") {
                localStorageService.remove('inventory-categories', results.categories);
                Notification.success({ message: translation[_lang].category_deleted_successfully });
            } else {
                Notification.error({ message: translation[_lang].supplier_is_not_deleted });
            }
        });
    };

    $scope.removeCategoryChoice = function (id) {
        //settingDeleteCategory
        var category = {
            id: id
        };
        Data.ajaxPost('setting/deleteCategory', category).then(function (results) {
            if (results.status === "success") {
                $scope.categories = $scope.categories.filter(function (el) {
                    return el.id !== id;
                });
                Notification.success({ message: translation[_lang].category_deleted_successfully });
                localStorageService.remove('inventory-categories', results.categories);
            } else {
                Notification.error({ message: translation[_lang].delete_category_failed });
            }
        });
    };

    //client-Suppliers 
    appGetServices.getProductSuppliers(function (data) {
        $scope.suppliers = data;
    });

    $scope.addNewSupplier = function () {
        Data.ajaxPost('setting/addSupplier', {}).then(function (results) {
            if (results.status === "success") {
                $scope.suppliers.push({
                    'id': results.id
                });
                localStorageService.remove('inventory-suppliers', $scope.suppliers);
                 Notification.success({ message: translation[_lang].successfully_deleted_Provider });
            } else {
                Notification.error({ message: translation[_lang].supplier_is_not_deleted });
            }
        });
    };

    // updateSupplier
    $scope.saveSupplierChange = function (id, name) {
        var supplier = {
            id: id,
            name: name
        };
        Data.ajaxPost('setting/updateSupplier', supplier).then(function (results) {
            if (results.status === "success") {
                localStorageService.remove('inventory-suppliers', $scope.suppliers);
                Notification.success({ message: translation[_lang].successfully_deleted_Provider });
            } else {
                Notification.error({ message: translation[_lang].supplier_is_not_deleted });
            }
        });
    };

    $scope.removeSupplierChoice = function (id) {
        //settingDeleteCategory
        var suppliers = {
            id: id
        };
        Data.ajaxPost('setting/deleteSupplier', suppliers).then(function (results) {
            if (results.status === "success") {
                $scope.suppliers = $scope.suppliers.filter(function (el) {
                    return el.id !== id;
                });
                Notification.success({ message: translation[_lang].successfully_deleted_Provider });
                localStorageService.remove('inventory-suppliers', results.suppliers);
            } else {
                Notification.error({ message: translation[_lang].supplier_is_not_deleted });
            }
        });
    };


    //client-status
    appGetServices.getClientStatus(function (data) {
        $scope.clientStatus = data;
    });


    $scope.addNewStatus = function () {
        Data.ajaxPost('setting/addStatus', {}).then(function (results) {
            if (results.status === "success") {
                $scope.clientStatus.push({
                    'id': results.id
                });
                localStorageService.remove('client-status', $scope.clientStatus);
                Notification.success({ message: translation[_lang].update_successful });
            }else{
                Notification.error({ message: translation[_lang].update_failed });
            }
        });
    };


    //updateStatus
    $scope.saveStatusChange = function (id, name) {
        var client_status = {
            id: id,
            name: name
        };

        Data.ajaxPost('setting/updateStatus', client_status).then(function (results) {
            if (results.status === "success") {
                localStorageService.remove('client-status', $scope.clientStatus);
                 Notification.success({ message: translation[_lang].update_successful });
            }else{
                 Notification.error({ message: translation[_lang].update_failed });
            }
        });
    };

    $scope.removeStatusChoice = function (id) {
        var client_status = {
            id: id
        };
        Data.ajaxPost('setting/deleteStatus', client_status).then(function (results) {
            if (results.status === "success") {
                $scope.clientStatus = $scope.clientStatus.filter(function (el) {
                    return el.id !== id;
                });
                Notification.success({ message: translation[_lang].successfully_deleted_status });
                localStorageService.remove('client-status', results.clientStatus);
            } else {
                Notification.error({ message: translation[_lang].the_status_is_not_deleted });
            }
        });
    };

    // general-settings
    appGetServices.getGeneralSettings(function (data) {
        $scope.vat = data;
    });

    $scope.saveGeneralSettings = function () {
        var json = $scope.vat.vat;
        if ($.isNumeric($scope.vat.vat)) {
            data = json;
            Data.ajaxPost('setting/updateGeneralSetting', data).then(function (results) {
                if (results.status == "success") {
                    appGetServices.clearAll(function (data) { });
                    localStorageService.set('user-data', results.userData);
                    Notification.success({ message: translation[_lang].successfully_saved_settings });
                } else {
                    Notification.error({ message: translation[_lang].settings_are_not_saved });
                }
            });
        } else {
            Notification.error({ message: translation[_lang].missing_parameters });
        }
    };

    $scope.user_data;
    appGetServices.getUserData(function (data) {
         $scope.user_data = data;
    });

	$scope.updatePass = function (reset) {
        if(reset && reset.pass && reset.new_pass && reset.again_pass && (reset.new_pass == reset.again_pass) ){
            $scope.disabledValidator = true;
			Data.ajaxPost('user/updateUserPass', reset).then(function (results) {
				if (results.status == "success") {
					Notification.success({ message: translation[_lang].update_successful });
					$scope.disabledValidator = false;
                    $scope.reset = {};
				} else {
					Notification.error({ message: translation[_lang].update_successful });
					$scope.disabledValidator = false;
				}
			});
        }
	};

	$scope.updateDetails = function (details) {
        $scope.disabledValidator = true;
        Data.ajaxPost('user/updateUserDetails', details).then(function (results) {
            if (results.status == "success") {
                Notification.success({ message: translation[_lang].update_successful });
                localStorageService.set('user-data', details);
                $scope.disabledValidator = false;
            } else {
                Notification.error({ message: translation[_lang].update_successful });
                $scope.disabledValidator = false;
            }
        });
	};
    
});
