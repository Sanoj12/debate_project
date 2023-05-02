const GoogleStratedy=require('passport-google-oauth20').Strategy;
const passport=require('passport')


passport.serializeUser((user,done)=>{
    done(null,user.id);
  })
  passport.deserializeUser((user,done)=>{
    done(null,user);
  })

  

passport.use(new GoogleStratedy({
    clientID:'971969070801-cuinla2s0prum3oiji8b1ei90fe31qkq.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:"http://localhost:3000/google/callback"
    },
    
    
    function(accessToken,refreshToken,profile,done){
       //register user here not using any database
       console.log(profile);
       done(null,profile);
    }
  ));
  
  