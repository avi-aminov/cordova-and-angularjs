app.controller('signupCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, Notification) {
 
    $scope.signup = {};
    $scope.signUp = function (signup) {

		if(signup.email && validateEmail(signup.email) && signup.pass){
			Data.ajaxPost('user/signUp', signup).then(function (results) {
				if (results.status == "success") {
					Notification.success({message: translation[_lang].registration_successful});
					$location.path('login');
				}else{
					Notification.error({message: translation[_lang].registration_failed});
				}
			});
		}else{
			Notification.error({message: translation[_lang].parameters_is_incorrect});
		}

    };

	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

});