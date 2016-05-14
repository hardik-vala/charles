app.service('ConfigService', function ($http) {
    
    var config;
    $http.get("config.json").success(function (data) {
       config = data;
    });
    
    this.getFBLink = function () { return config.fbLink; };
    
});
