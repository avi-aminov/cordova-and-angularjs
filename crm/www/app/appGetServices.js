app.factory('appGetServices', function (Data, localStorageService) {

    // all parameter saved in session storage
    return {

        generatUniqeId: function (){
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 16; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },


        //delete-all
        clearAll: function (callback) {
            localStorageService.clearAll();
            if (typeof callback === "function") callback(data);
        },


        //delete-key
        removeItem: function (k ,callback) {
            localStorageService.remove(k);
            if (typeof callback === "function") callback(data);
        },


        //general-settings (vat)
        getGeneralSettings: function (callback) {
            var data;
            if (!localStorageService.get('general-settings')) {
                Data.ajaxPost('setting/getGeneralSetting', {}).then(function (results) {
                    if (results.status === "success") {
                        data = JSON.parse(results.settings[0].json);
                        localStorageService.set('general-settings', data);
                        data = localStorageService.get('general-settings');
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('general-settings');
                if (typeof callback === "function") callback(data);
            }
        },


        //inventory-categories
        getProductCategories: function (callback) {
            var data;
            if (!localStorageService.get('inventory-categories')) {
                Data.ajaxPost('setting/getCategories', {}).then(function (results) {
                    if (results.status === "success") {
                        data = results.categories;
                        localStorageService.set('inventory-categories', data);
                        data = localStorageService.get('inventory-categories');
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('inventory-categories');
                if (typeof callback === "function") callback(data);
            }
        },
    

        //client-status
        getClientStatus: function (callback) {
            var data;
            if (!localStorageService.get('client-status')) {
                if (typeof callback === "function") callback(false);
            } else {
                data = localStorageService.get('client-status');
                if (typeof callback === "function") callback(data);
            }
        },  


        //inventory-Suppliers
        getProductSuppliers: function (callback) {
            var data;
            if (!localStorageService.get('inventory-suppliers')) {
                Data.ajaxPost('setting/getSuppliers', {}).then(function (results) {
                    if (results.status === "success") {
                        data = results.suppliers;
                        localStorageService.set('inventory-suppliers', data);
                        data = localStorageService.get('inventory-suppliers');
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('inventory-suppliers');
                if (typeof callback === "function") callback(data);
            }
        },
        

        //dooList
        getToDooList: function (callback) {
            var data;
            if (!localStorageService.get('todoo-list')) {
                Data.ajaxPost('todoo/getList', {}).then(function (results) {
                    if (results.status === "success") {
                        data = results.todooList;
                        localStorageService.set('todoo-list', data);
                        data = localStorageService.get('todoo-list');
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('todoo-list');
                if (typeof callback === "function") callback(data);
            }
        },


        // get products List
        getProductsList: function (callback) {
            var data;
            if (!localStorageService.get('products')) {
                Data.ajaxPost('products/getProductList', {}).then(function (results) {
                    if (results.status === "success") {
                        data = results.products;
                        localStorageService.set('products', data);
                        data = localStorageService.get('products');
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('products');
                if (typeof callback === "function") callback(data);
            }
        },


        //clients
        getClients: function (callback) {
            var data;
            if (localStorageService.get('clients')) {
                data = localStorageService.get('clients');
                if (typeof callback === "function") callback(data);
            } else {
                if (typeof callback === "function") callback(false);
            }
        },


        //clients statistics
        getStatisticsListByClient: function (id, callback) {
            client_id = id;
            var data;
            if (!localStorageService.get('purchases-' + id)) {
                Data.ajaxPost('statistics/getProductStatisticsListByClient', client_id).then(function (results) {

                    if (results.status === "success") {
                        data = results.products;
                        localStorageService.set('purchases-' + id, data);
                        data = localStorageService.get('purchases-' + id);
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('purchases-' + id);
                if (typeof callback === "function") callback(data);
            }
        },


        //Product Statistics List
        getProductStatisticsList: function (id, callback) {
            product_id = id;
            var data;
            if (!localStorageService.get('products-' + id)) {
                Data.ajaxPost('statistics/getProductStatisticsList', product_id).then(function (results) {
                    if (results.status === "success") {
                        data = results.products;
                        localStorageService.set('products-' + id, data);
                        data = localStorageService.get('products-' + id);
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('products-' + id);
                if (typeof callback === "function") callback(data);
            }
        },



        //clients lastVisits
        getLastClientVisits: function (id, callback) {
            client_id = id;
            var data;
            if (!localStorageService.get('lastVisits-' + id)) {
                Data.ajaxPost('statistics/getLastClientVisits', client_id).then(function (results) {
                    if (results.status === "success") {
                        data = results.lastVisits;
                        localStorageService.set('lastVisits-' + id, data);
                        data = localStorageService.get('lastVisits-' + id);
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('lastVisits-' + id);
                if (typeof callback === "function") callback(data);
            }
        },


        //clients track 
        getClientTrackings: function (id, callback) {
            client_id = id;
            var data;
            if (!localStorageService.get('client-tracking-'+id)) {
                Data.ajaxPost('statistics/getClientTrackingsList', client_id).then(function (results) {
                    if (results.status === "success") {
                        data = results.tracking;
                        localStorageService.set('client-tracking-'+id, data);
                        data = localStorageService.get('client-tracking-'+id);
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('client-tracking-'+id);
                if (typeof callback === "function") callback(data);
            }
        },


        //product returns 
        getProductReturns: function (id, callback) {
            product_id = id;
            var data;
            if (!localStorageService.get('product-returns-'+id)) {
                Data.ajaxPost('purchase/getReturnsList', product_id).then(function (results) {
                    if (results.status === "success") {
                        data = results.returns;
                        localStorageService.set('product-returns-'+id, data);
                        data = localStorageService.get('product-returns-'+id);
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
                });
            } else {
                data = localStorageService.get('product-returns-'+id);
                if (typeof callback === "function") callback(data);
            }
        },


        //user data 
        getUserData: function (callback) {
            var data;
            if (!localStorageService.get('user-data')) {
                Data.ajaxPost('user/login', {}).then(function (results) {
                     if (results.session === "ok") {
                        localStorageService.set('user-data', results.userData);
                        data = localStorageService.get('user-data');
                        if (typeof callback === "function") callback(data);
                    } else {
                        if (typeof callback === "function") callback(false);
                    }
		    	});
            } else {
                data = localStorageService.get('user-data');
                if (typeof callback === "function") callback(data);
            }
        },


    };
});