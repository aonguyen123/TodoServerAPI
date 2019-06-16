const signinController = require('./../controller/signinControler');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.get('/api/auth/user', signinController.loginRequired, (req, res) => {
        jwt.verify(req.token, 'restfullapis', (err, authData) => {
            if(err)
            {
                return res.send({
                    message: 'err'
                });
            }
            else
            {
                return res.send({
                    authData
                })
            }
        });
    });
}