
window.fbAsyncInit = function() {
    FB.init({
        appId      : '328739433954471',
        cookie     : true,  // enable cookies to allow the server to access
        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
    });

    FB.getLoginStatus(function(response) {
        processLoginAttempt(response);
    });

};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


/**
 * Pass FB response object to server.  Update user area with image and name
 * @param response
 */
function retrieveUserInfo(response) {
    console.log('getting data');
    $.post(
        '/user',
        {
            'accessToken': response.authResponse.accessToken
        },
        function(data) {
            //handle success
            if (data.error === true) {
                // report if there was an error
                $('<span></span>', {
                    class: 'error',
                    text: 'Oops, looks like something went wrong.  Please try again later'
                });
            } else {
                // show logout button and hide login button
                $('#logout').show();
                $('#login').hide();

                var name = data.name,
                    imgUrl = data.picture.data.url;

                // update #status with image and name
                $('<img />', {
                    id: 'userImg',
                    src: imgUrl
                }).appendTo('#status');
                $('<span></span>', {
                    id: 'userName',
                    text: name
                }).appendTo('#status');
            }
        },
        'json'
    );
}

// logout function, triggered onClick() of "Logout" button
function logout() {
    FB.logout(function(response) {
        $('#status').html('');
        $('#logout').hide();
        $('#login').show();
    });
}

// Process login response from facebook
function processLoginAttempt(response) {
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        retrieveUserInfo(response);
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        $('#status').html = 'Please log into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        $('#status').html = 'Please log into Facebook.';
    }
}

// function called by fb:button-login once a successful login occurs
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        processLoginAttempt(response);
    });
}
