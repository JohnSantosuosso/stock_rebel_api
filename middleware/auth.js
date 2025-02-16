require('dotenv').config();
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');
const User = db.User;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN
  }
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);
      
      if (user) {
        return done(null, user);
      }
      
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport.authenticate('jwt', { session: false });