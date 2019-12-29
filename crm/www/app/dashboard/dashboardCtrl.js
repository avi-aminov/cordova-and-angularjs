app.controller('dashboardCtrl', function (
	$scope, $rootScope, $location, $http, Data, Notification, localStorageService, DTOptionsBuilder) {

	$rootScope.generalSetting = {
		title: _site_title,
		ver: _ver
	};
});