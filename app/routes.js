module.exports = (app, passport) => {

    // show the home page (will also have our login links)
    app.get('/', (req, res) => res.render('index.ejs'));

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, (req, res) => res.render('profile.ejs', {user: req.user}));

    // LOGOUT ==============================
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', (req, res) => res.render('login.ejs', {message: req.flash('loginMessage')}));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', (req, res) => res.render('signup.ejs', {message: req.flash('signupMessage')}));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
