app.controller('forgotPpasswordCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, Notification) {
    //initially set those objects to null to avoid undefined error
    $scope.forgotPpassword = {};
	
    
	
	
	
	
	$scope.doRenewPass = function (user) {

		if(user && user.email && validateEmail(user.email)){
			
			Data.ajaxPost('user/userRenewPassword', user).then(function (results) {
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
			
		/*
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
		*/

    };
	
	
	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	
	
	//$rootScope.checkAuthenticated();
	
});