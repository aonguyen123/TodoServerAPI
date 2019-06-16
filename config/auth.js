module.exports = {
    'facebookAuth' : {
        'clientID'        : '430604461012469', // your App ID
        'clientSecret'    : '2a263719753879c7d3d001c5db6eefd0', // your App Secret
        'callbackURL'     : 'http://localhost:4000/auth/facebook/callback',
        'profileURL'      : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    }
}