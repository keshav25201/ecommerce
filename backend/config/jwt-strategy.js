const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'secretKey',
    algorithms : ['RS256']
}
passport.use(new JwtStrategy(options,(jwt_payload,done) => {
    console.log("here");
    User.findOne({_id : jwt_payload._id},(err,user) => {
        if(err)return done(err,false);
        if(!user)return done(null,false);
        return done(null,user);
    })
}))