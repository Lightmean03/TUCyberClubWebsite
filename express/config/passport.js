const passport = require("passport");
const opts = {}
const secretKey = process.env.JWT_SECRET_KEY;
const User = require("../models/User");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;


passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try{
    const user = await User.findById(jwt_payload.id);
    if(user){
      return done(null, user);
    }
    return done(null, false);
  }catch(error){

  }
}));