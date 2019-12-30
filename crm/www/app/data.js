app.factory("Data", ['$http', function ($http) {      
  
        var obj = {};
   
        obj.get = function (q) {
            return $http.get(_base + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(_base + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(_base + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(_base + q).then(function (results) {
                return results.data;
            });
        };
        
        

		obj.ajaxPost = function (file, data) {
            return $http({
                url: _server + file + '.php',
                method: "POST",
                data: data
            }).then(
                function(response) {
                    // success
                    return response.data;
                }, 
                function(response) {
                    // failed
                }
            );
        };
		

        return obj;
}]);