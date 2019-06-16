const configAuth = require('./auth');
const FacebookStratery = require('passport-facebook').Strategy;
const User = require('./../api/models/user');

module.exports = async (passport) => {
    // mã hóa dữ liệu để đưa user vào session
    passport.serializeUser(async (user, done) => {
        done(null, user);
    });
    // giải mã định dạng
    passport.deserializeUser(async (user, done) => {
        done(null, user);
    });

    // facebook
    let fbStratery = configAuth.facebookAuth;
    fbStratery.passReqToCallback = true;
    passport.use(new FacebookStratery(fbStratery,
        async function (req, token, refreshToken, profile, done) {
            process.nextTick(async function () {
                if (!req.user) {
                    let user = await User.findOne({ 'facebook.id': profile.id });
                    if (!user) {
                        return done(err);
                    }
                    if (user) {
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            const result = await user.save();
                            if (!result) {
                                return;
                            }
                            return done(null, user);
                        }
                        return done(null, user);
                    }
                    else {
                        let newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                        await newUser.save();
                        if (!newUser) {
                            return;
                        }
                        return done(null, newUser);
                    }
                }
                else {
                    let user = req.user; // pull the user out of the session
                    return done(null, user);
                }
            });
        }));
};