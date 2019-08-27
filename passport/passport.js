const passport = require('passport');
const User = require('../models/User');
const config = require('config');

//query inloggen en registreren
passport.use(User.createStrategy());

//gebruiker wordt naar een string geserialiseerd
//daarna omgekeerd uitgelezen uit een sessie
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//webtoken strategie
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('jwt.secret');

//payload = token die je binnen krijgt
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //users zoeken op basis van id
    User.findOne({_id: jwt_payload.uid}, function(err, user) {
        if (err) {
            //error? -> krijg error terug
            return done(err, false);
        }
        if (user) {
            //user gevonden? -> krijg je de user terug
            return done(null, user);
        } else {
            //niet gevonden? -> niet terug
            return done(null, false);
        }
    });
}));

module.exports = passport;