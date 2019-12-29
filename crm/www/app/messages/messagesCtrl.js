app.controller('messagesCtrl', function (
	$scope, $location, DTOptionsBuilder, $window, appGetServices) {

	$scope.tody = [];
	$scope.inWeek = [];
	$scope.inMon = [];

	appGetServices.getClients(function (data) {
		$scope.clients = data;
		birthDateFillter();
	});

	function birthDateFillter() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var d1 = new Date(Date.UTC(year, month, day, 4, 0, 0, 0));

		angular.forEach($scope.clients, function (value, key) {

			var clientBirthDate = value.birth_date;
			var date_split = clientBirthDate.split("-");
			var d2 = new Date(Date.UTC(year, date_split[1], date_split[2], 4, 0, 0, 0));
			var diff = diffDays(d1, d2);

			if (diff == 0) {
				$scope.tody.push(value);
			} else {
				if (diff > 0 && diff < 8) {
					$scope.inWeek.push(value);
				} else {
					if (diff > 7 && diff < 31) {
						$scope.inMon.push(value);
					}
				}
			}
		});
	}

	function diffDays(d1, d2) {
		var timeDiff = d2.getTime() - d1.getTime();
		var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return diff;
	}

	$scope.sendEmail = function (email) {
		$window.location.href = '#/send-email/' + email;
	}

	$scope.openClient = function (id) {
		$window.location.href = '#/client-statistics/' + id;
	}

});