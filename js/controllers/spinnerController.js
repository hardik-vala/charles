app.controller('spinnerController', function($scope, $log, $rootScope) {
    
    var opts = {
        lines: 12, // The number of lines to draw
        length: 10, // The length of each line
        width: 5, // The line thickness
        radius: 20, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#CCCCCC', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: -100, // The z-index (defaults to 2000000000)
        top: '400px', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };

    var target = document.getElementById('spinner');
    var spinner = new Spinner(opts).spin(target);

});
