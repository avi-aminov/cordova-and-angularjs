var app = angular.module('crmApp',
	[
		'ngRoute',
		'ui-notification',
		'LocalStorageModule',
		'datatables',
		'oc.modal',
		'AxelSoft',
		'ngInputDate',
		'chart.js',
		'angucomplete',
		'ngTableToCsv'
	]
);

app.config(
	[
		'$routeProvider', 
		'localStorageServiceProvider', 
		function ($routeProvider, localStorageServiceProvider) {
			localStorageServiceProvider.setPrefix('crmApp').setStorageType('localStorage').setNotify(true, true)
			$routeProvider
			.when('/', { 
				title: 'Login', 
				templateUrl: 'app/user/login/login.html', 
				controller: 'loginCtrl',
				role: '0' 
			})
			.when('/login', { 
				title: 'Login', 
				templateUrl: 'app/user/login/login.html', 
				controller: 'loginCtrl' 
			})
			.when('/signup', { 
				title: 'Signup', 
				templateUrl: 'app/user/signup/signup.html', 
				controller: 'signupCtrl' 
			})
			.when('/forgot-password', { 
				title: 'forgotPpassword', 
				templateUrl: 'app/user/forgotPpassword/forgotPpassword.html', 
				controller: 'forgotPpasswordCtrl' 
			})
			.when('/dashboard', { 
				title: 'Dashboard', 
				templateUrl: 'app/dashboard/dashboard.html', 
				controller: 'dashboardCtrl', 
			})
			.when('/inventory-list', { 
				title: 'inventory-list', 
				templateUrl: 'app/inventory/list/list.html', 
				controller: 'listCtrl', 
			})
			.when('/add-product', { 
				title: 'add-product', 
				templateUrl: 'app/inventory/addProduct/addProduct.html', 
				controller: 'addProductCtrl', 
			})
			.when('/edit-product/:product_id', { 
				title: 'edit-product', 
				templateUrl: 'app/inventory/editProduct/editProduct.html', 
				controller: 'editProductCtrl', 
			})
			.when('/setting', { 
				title: 'setting', 
				templateUrl: 'app/setting/setting.html', 
				controller: 'settingCtrl', 
			})
			.when('/add-client', { 
				title: 'add-client', 
				templateUrl: 'app/clients/addClient/addClient.html', 
				controller: 'addClientCtrl', 
			})
			.when('/sale', { 
				title: 'sale', 
				templateUrl: 'app/sale/sale.html', 
				controller: 'saleCtrl', 
			})
			.when('/todoo-list', { 
				title: 'todoo-list', 
				templateUrl: 'app/todoo/todoo.html', 
				controller: 'todooCtrl', 
			})
			.when('/messages', { 
				title: 'messages', 
				templateUrl: 'app/messages/messages.html', 
				controller: 'messagesCtrl', 
			})
			.when('/send-email/:email', { 
				title: 'Send Email', 
				templateUrl: 'app/send-email/sendEmail.html', 
				controller: 'sendEmailCtrl', 
			})
			.when('/client-list', { 
				title: 'client-list', 
				templateUrl: 'app/clients/clientList/clientList.html', 
				controller: 'clientListCtrl', 
			})
			.when('/reports', { 
				title: 'reports', 
				templateUrl: 'app/reports/reports.html', 
				controller: 'reportsCtrl', 
			})
			.when('/tutorial', { 
				title: 'tutorial', 
				templateUrl: 'app/tutorial/tutorial.html', 
				controller: 'tutorialCtrl', 
			})
			.when('/edit-client/:client_id', { 
				title: 'edit-client', 
				templateUrl: 'app/clients/editClient/editClient.html', 
				controller: 'editClientCtrl', 
			})
			.when('/client-statistics/:client_id', { 
				title: 'client-statistics', 
				templateUrl: 'app/statistics/client/clientStatistics.html', 
				controller: 'clientStatisticsCtrl', 
			})
			.when('/product-statistics/:product_id', { 
				title: 'client-statistics', 
				templateUrl: 'app/statistics/product/productStatistics.html', 
				controller: 'productStatisticsCtrl', 
			})
			.otherwise({ redirectTo: '/login' });
		}
	]
);
app.run(function ($rootScope, $location, Data, appGetServices) {

	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		
		data = {
			'method': 'crmApp',
			'fullname': 'fullname',
			'email': 'email',
			'phone': 'phone'
		}

		Data.ajaxPost('user/session', data).then(function (results) {
			var url = $location.path();
			if (results.id && results.id != '') {
				$rootScope.authenticated = true;
				$rootScope.id = results.id;
				$rootScope.email = results.email;
				if (url == '/signup' || url == '/login' || url == '/forgot-password' || url == '/') {
					appGetServices.clearAll(function(data){});
					$location.path('/dashboard');
				}
			} else {
				$rootScope.authenticated = false;		
				if (url == '/signup' || url == '/login' || url == '/forgot-password') {
					$location.path(url);
				} else {
					$location.path('/login');
				}
			}
		});
				
		$rootScope.rtl = _rtl;
		$rootScope.translation = translation;
		$rootScope._lang = _lang;
		
	});
});
