app.controller('mainController', function() {

    /* Checks there is a connection to Firebase. */
    this.connectedToFirebase = function () {
        // Connection is verified through the existence of the FB object.
        return typeof FB !== 'undefined';
    };
    
});
