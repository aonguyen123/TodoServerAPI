const signinController = require('../controller/signinControler');

module.exports = (app) => {
    app.post('/auth/signin', (req, res) => {
        signinController.signin(req,res);
    });   

    app.post('/register', (req, res) => {
        signinController.signup(req,res);
    });
}