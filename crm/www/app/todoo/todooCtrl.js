app.controller('todooCtrl', function ($scope,
	$rootScope,
	$routeParams,
	$location,
	$http,
	Data,
	Notification,
	localStorageService,
	DTOptionsBuilder,
	appGetServices
) {

	$scope.disabledValidator = false;
	$scope.tasks_count = 0;
	//$scope.todooList;

	//dooList
	appGetServices.getToDooList(function (data) {
		$scope.tasks = data;
	});

	$scope.addTask = function (name) {
		if (name && name != '') {
			$scope.disabledValidator = true;
			var task = {
				name: name
			};
			Data.ajaxPost('todoo/new', task).then(function (results) {
				if (results.status == "success") {
					localStorageService.remove('todoo-list');
					appGetServices.getToDooList(function (data) {
						$scope.tasks = data;
					});
					$scope.new_task = '';
					Notification.success({ message: translation[_lang].task_has_been_successfully_saved });
					$scope.disabledValidator = false;
				} else {
					Notification.error({ message: translation[_lang].task_could_not_be_saved });
					$scope.disabledValidator = false;
				}
			});
		} else {
			Notification.error({ message: translation[_lang].missing_parameters });
		}
	};


	var temp;
	$scope.temp = function(valid){
		temp = valid;
	};

	$scope.saveTaskChange = function (task) {
		if(temp !== task.name){
			Data.ajaxPost('todoo/update', task).then(function (results) {
				if (results.status == "success") {
					localStorageService.remove('todoo-list');
					appGetServices.getToDooList(function (data) {
						$scope.tasks = data;
					});
					Notification.success({ message: translation[_lang].update_successful });
				} else {
					Notification.error({ message: translation[_lang].update_failed });
				}
			});
			temp = '';
		}
	};

	$scope.taskDone = function (task) {
		task.done = 1;
		Data.ajaxPost('todoo/update', task).then(function (results) {
			if (results.status == "success") {
				localStorageService.remove('todoo-list');
				appGetServices.getToDooList(function (data) {
					$scope.tasks = data;
				});
				Notification.success({ message: translation[_lang].update_successful });
			} else {
				Notification.error({ message: translation[_lang].update_failed });
			}
		});
	};

	$scope.taskRevers = function (task) {
		task.done = 0;
		Data.ajaxPost('todoo/update', task).then(function (results) {
			if (results.status == "success") {
				localStorageService.remove('todoo-list');
				appGetServices.getToDooList(function (data) {
					$scope.tasks = data;
				});
				Notification.success({ message: translation[_lang].update_successful });
			} else {
				Notification.error({ message: translation[_lang].update_failed });
			}
		});
	};

	$scope.delTask = function (task) {
		task.is_delete = 1;
		Data.ajaxPost('todoo/delete', task).then(function (results) {
			if (results.status == "success") {
				localStorageService.remove('todoo-list');
				appGetServices.getToDooList(function (data) {
					$scope.tasks = data;
				});
				Notification.success({ message: translation[_lang].update_successful });
			} else {
				Notification.error({ message: translation[_lang].update_failed });
			}
		});
	};

});