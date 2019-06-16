module.exports = (passport, app) => {
    //gui len facebook de xac thuc
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: 'http://localhost:3000/signin',
            failureRedirect: 'http://localhost:3000/signin'   
        })
    );
    app.get('/api/auth/facebook', function(req, res) {
        if(req.user)
        {
            return res.json({
                userFacebook: req.user
            })
        }
        res.json({
            message: 'not login facebook'
        })
    });
}