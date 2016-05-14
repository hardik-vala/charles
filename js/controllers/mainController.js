app.controller('mainController', function(ConfigService) {

    /* Checks there is a connection to Firebase. */
    this.connectedToFirebase = function () {
        return typeof ConfigService.fbLink() !== 'undefined';
    };
    
});
