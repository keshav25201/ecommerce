const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
function verifyPassword(user,password){
    const val = user.password === password
    return val;
}
passport.use(new localStrategy({usernameField : 'mobile'},
    function (username,password,done){
        // console.log(username,password);
        User.findOne({mobile : username},(err,user) => {
            if(err)return done(err);
            if(!user)return done(null,false);
            if(!verifyPassword(user,password))return done(null,false);
            return done(null,user);
        })
    }
))

// passport.serializeUser((user,done) => {
//     done(null,user._id);
// })
// passport.deserializeUser((_id,done) => {
//     User.findOne({_id : _id},(err,user)=>{
//         done(err,user);
//     })
// })