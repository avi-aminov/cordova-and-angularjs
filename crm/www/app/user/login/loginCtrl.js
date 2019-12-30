app.controller('loginCtrl', 
	function (	$scope, $rootScope, $location, Data, Notification, localStorageService, appGetServices) {

    $scope.login = {
		remember:$scope.userRemember
	};

    $scope.doLogin = function (customer) {
		if(customer.email && validateEmail(customer.email) && customer.pass){
			data = customer;

			
			Data.ajaxPost('user/login', data).then(function (results) {
				if (results.status == "success") {

					if(customer.remember && customer.remember == true){
						localStorage.setItem("userlogin", JSON.stringify({user:customer.email , pass:customer.pass}) );
					}else{
						localStorage.removeItem("userlogin");
					}

					appGetServices.clearAll(function(data){});
					localStorageService.clearAll();
					localStorageService.set('user-data', results.userData);
					$location.path('dashboard');
						Notification.success({message: translation[_lang].login_success});
				}else{
					Notification.error({message: translation[_lang].login_unsuccessful});
				}
			});
			
		}else{
			Notification.error({message: translation[_lang].parameters_is_incorrect});
		}

    };

	/*
	
	Data.ajaxPost('user/session', data).then(function (results) {
		var url = $location.path();
		if (!results.id) {
			$scope.userRemember = false;
			if (localStorage.getItem("userlogin")) {
				$scope.userRemember = true;
				var user = JSON.parse(localStorage.getItem("userlogin"));
					var login = {
						remember: $scope.userRemember,
						email: user.user,
						pass: user.pass
					};
				$scope.doLogin(login);
			}
		}
	});
	*/
	

	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
});