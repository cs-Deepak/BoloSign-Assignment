
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");
const connectDB = require('./db/conn');
const manualAuthRoutes = require("./routes/manualAuthRoutes");
const emailRoutes = require("./routes/emailRoutes"); // adjust path if needed
app.use("/", emailRoutes);



app.use(cors({
  origin: "https://quicksign3.netlify.app",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Connect to MongoDB once at startup
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));



// Middleware
app.use(cors({
  origin: "https://quicksign3.netlify.app",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use("/auth/manual", manualAuthRoutes);
app.use(express.json());

// Session configuration with more secure settings
app.use(session({
  secret: process.env.SESSION_SECRET || "1245644298hniyrcoiuqn",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Google Strategy
passport.use(new OAuth2Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback", // Use relative URL
    passReqToCallback: true,
    scope: ['profile', 'email'] // Ensure the scope includes both 'profile' and 'email'
  }, async (request, accessToken, refreshToken, profile, done) => {
    try {
      console.log("Google profile:", JSON.stringify(profile, null, 2));

      let user = await userdb.findOne({ googleId: profile.id });
      
      if (!user) {
        user = new userdb({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.picture?.[0]?.value || '' // Handle potential missing photos
          // image: profile?.photos?.[0]?.value || ''

        });
        await user.save();
      } else {
  // ✅ Update image if not present
  if (!user.image && profile.photos?.[0]?.value) {
    user.image = profile.photos[0].value;
    await user.save();
  }
}
      
      return done(null, user);
    } catch (error) {
      console.error("Error in OAuth callback:", error);
      return done(error, null);
    }
  }));
  

// Serialization/Deserialization
passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userdb.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Routes
app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get("/auth/google/callback", 
  passport.authenticate("google", {
    failureRedirect: "https://quicksign3.netlify.app/login"
  }),
  (req, res) => {
    res.redirect("https://quicksign3.netlify.app/dashboard");
  }
);

// User data endpoint
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  }
  return res.status(401).json({
    success: false,
    message: "Not authenticated"
  });
});

// Logout route
// Logout route to clear the session
app.get("/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log("Error during logout:", err);
        return res.status(500).send("Error during logout.");
      }
      res.clearCookie("connect.sid"); // Clear the session cookie if necessary
      res.redirect("https://quicksign3.netlify.app/login"); // Redirect the user to the login page or home page
    });
  });
  

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server error"
  });
});

app.get("/login/success",async(req,res)=>{
  // console.log("reqqqqqq",req.user);
  
  if(req.user){
    res.status(200).json({message:"user Login",user:req.user})

  }else{
    res.status(400).json({message:"No Authorized"})
  }
})


//logout
app.get("/logout",(req,res,next)=>{
  req.logOut(function(err){
    if(err){return next(err)}
    res.redirect("https://quicksign3.netlify.app");
  })
})




// api

app.post("/api/v2/addTask", (req, res) => {
  console.log("Request received:", req.body);
  res.send({ success: true });
});




//app config

const PORT = process.env.PORT || 6005;
module.exports = app;
});

// const PORT = process.env.PORT || 6005;
// module.exports = app;


// Start Server
const PORT = process.env.PORT || 6005;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
