let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let User = require('./../models/user');

exports.signin = async (req, res) => {
    let user = await User.findOne({'local.email': req.body.email, 'local.isDeleted': false});
    if(!user)
    {
        return res.json({
            message: 'Login failed. User not found'
        });
    }
    else if(user)
    {
        if(!user.validPassword(req.body.password))
        {
            return res.json({
                message: 'Login failed. Wrong password'
            })      
        }
        else
        {
            return res.json({
                token: jwt.sign({user}, 'restfullapis')
            });
        }
    }
}

exports.signup = async (req, res) => {
    let userOld = await User.find({'local.email': req.body.email});
    if(userOld.length > 0)
    {
        res.json({
            message: 'user exits'
        })
    }
    else
    {
        let newUser = new User({
            local: req.body
        });
        newUser.local.password =  await newUser.generateHash(req.body.password);
        newUser.local.isDeleted = false;
        let user = await newUser.save();
        if(user)
        {
            return res.json({
                user
            })
        }
        return res.json({
            message: 'add user err'
        })
    }     
}
//middle
exports.loginRequired = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader !== 'undefined' && bearerHeader !== undefined)
    {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else
    {
        return res.send({
            message: 'not logged in'
        })
    }
}
