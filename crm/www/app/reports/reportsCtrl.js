app.controller('reportsCtrl', function (
											$scope, 
											$rootScope, 
											$routeParams, 
											$location, $http,  
											Data, Notification, 
											localStorageService, 
											DTOptionsBuilder
										) 
									{
  	
	
	
	$scope.primary = function() {
		
		// primary, success, error, 
		//  Notification({message: 'Warning notification'}, 'warning');
		/*
		delay					Any integer value	5000	The time in ms the message is showing before start fading out
		startTop				Any integer value	10	Vertical padding between messages and vertical border of the browser
		startRight				Any integer value	10	Horizontal padding between messages and horizontal border of the browser
		verticalSpacing			Any integer value	10	Vertical spacing between messages
		horizontalSpacing		Any integer value	10	Horizontal spacing between messages
		positionX				"right", "left", "center"	"right"	Horizontal position of the message
		positionY				"top", "bottom"	"top"	Vertical position of the message
		replaceMessage			true, false	false	If true every next appearing message replace old messages
		templateUrl				Any string	"angular-ui-notification.html"	Custom template filename (URL)
		onClose					Any function	undefined	Callback to execute when a notification element is closed. Callback receives the element as its argument.
		closeOnClick			true, false	true	If true, messages are closed on click
		maxCount				Any integer	0	Show only [maxCount] last messages. Old messages will be killed. 0 - do not kill
	
		Notification(), Notification.primary()		Show the message with bootstrap's primary class
		Notification.info()							Show the message with bootstrap's info class
		Notification.success()						Show the message with bootstrap's success class
		Notification.warning()						Show the message with bootstrap's warn class
		Notification.error()						Show the message with bootstrap's danger class
		Notification.clearAll()						Remove all shown messages
		*/
		
		Notification.error({
			message: "Primary message top center position",
			positionY: 'top',
			positionX: 'left',
			delay: 3000,
		});
	};
	
	$scope.dashboard = true;

	$rootScope.generalSetting = {
		title:"CRM",
		ver: "?ver=7.0.0"							
	};
	


});