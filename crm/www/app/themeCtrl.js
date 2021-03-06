app.controller('themeCtrl', function ($scope, $rootScope, $location, $window, Data, Notification, fbService) {

	$scope.navBar = true;
	$scope.toglleNav = function () {
		$scope.navBar = !$scope.navBar;
	};

	$scope.logout = function () {


		if (localStorage.getItem("userlogin")) {
			localStorage.removeItem("userlogin");
		}


		fbService.logOut(function(data){
			if (data.msg == "successful") {
				Notification.success({ message: translation[_lang].you_are_disconnected });
				$location.path('login');
			} else {

			}
		});


		/*
		if (localStorage.getItem("userlogin")) {
			localStorage.removeItem("userlogin");
		}
		Data.ajaxPost('user/logout', {}).then(function (results) {
			if (results.status == "success") {
				Notification.success({ message: translation[_lang].you_are_disconnected });
				$location.path('login');
			} else {

			}
		});
		*/
	}

	$scope.back = function () {
		$window.history.back();
	};

});