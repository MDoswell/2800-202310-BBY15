// Start of config section.
// Load modules below via dependencies.js.
require('dotenv').config();
const { express, session, url, cors } = require('./config/dependencies');

// Declare database connections.
const { connectDB, sessionStore } = require('./config/databaseConnection');

// Function declarations
const { isValidSession } = require('./public/js/sessionValidation');

// Encrypt the session ID via GUID.
const node_session_secret = process.env.NODE_SESSION_SECRET;

// Port declaration below. Defaults to 8000 if system variable PORT not set.
const port = process.env.PORT || 8000;

// Calling Express.
const app = express();

// Enable ejs middleware.
app.set('view engine', 'ejs');

// Enable CORS for cross-origin-sharing using Axios.
app.use(cors());

// Enable JSON middleware.
app.use(express.json());

// Defining directory to serve image files.
app.use(express.static(__dirname + '/public'));

// The express.urlencoded middleware is used to parse incoming request bodies.
app.use(express.urlencoded({ extended: true }));

// Setup session support to enable storing session data.
app.use(session({
    secret: node_session_secret,
    store: sessionStore,
    saveUninitialized: false,
    resave: true
}
));
// End of config section.


// Start of middleware section.
// Navlinks and currentURL are used to determine which navlinks to display in the header.
app.use('/', (req, res, next) => {
    const navLinks = (isValidSession(req)) ? // Is a user with a valid session logged in?
            [
                { route: "Home", link: "/", materialIcon: "home" },
                { route: "Profile", link: "/profile", materialIcon: "account_circle" },
                { route: "Logout", link: "/logout", materialIcon: "logout"}
            ]
            : [ // Else, user not logged in (invalid session)
                { route: "Home", link: "/", materialIcon: "home" },
            ];

    app.locals.authenticated = isValidSession(req);
    app.locals.navLinks = navLinks;
    app.locals.currentURL = url.parse(req.url).pathname;
    next();
});


app.use("/js", express.static("./public/js"));

// Modular route paths declared below.
app.use('/', require('./routes/home'));
app.use('/signup', require('./routes/signup'));
app.use('/signup/submit', require('./routes/signupSubmit')); // post
app.use('/login', require('./routes/login'));
app.use('/login/submit', require('./routes/loginSubmit')); // post
app.use('/logout', require('./routes/logout'));
app.use('/profile', require('./routes/profile'));
app.use('/changePassword/begin', require('./routes/changePasswordBegin'));
app.use('/changePassword/begin/submit', require('./routes/changePasswordEmailSubmit'));
app.use('/changePassword', require('./routes/changePassword'));
app.use('/changePassword/submit', require('./routes/changePasswordSubmit'));
app.use('/openai', require('./routes/openaiRoute'));
app.use('/setup', require('./routes/firstTimeSetup'));
app.use('/profileUpdate', require('./routes/profileUpdate'));
app.use('*', require('./routes/error404'));
// Once connectDB is resolved by connecting to the MongoDB databases, start the server.
connectDB.then(() => {
    app.listen(port, () => {
        console.log('Node application listening on port ' + port);
    });
});