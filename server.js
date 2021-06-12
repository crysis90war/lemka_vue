const sslRedirect = require('heroku-ssl-redirect').default
const express = require('express');
const history = require('connect-history-api-fallback')
const path = require('path');
const serveStatic = require('serve-static');

const app = express();

app.use(sslRedirect())
// /* Redirect http to https */
// app.use((req, res, next) => {
//     if (req.header('x-forwarded-proto') !== 'https') {
//         res.redirect(`https://${req.header('host')}${req.url}`)
//     } else {
//         next();
//     }
// });

// Use a fallback for non-root routes (required for Vue router)
//   NOTE: History fallback must be "used" before the static serving middleware!
app.use(history({
    // OPTIONAL: Includes more verbose logging
    verbose: true
}))

app.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log('Listening on port: ' + port);
});

// app.get("*", function (req, res, next) {
//     if ("https" !== req.headers["x-forwarded-proto"] && "production" === process.env.NODE_ENV) {
//         res.redirect("https://" + req.hostname + req.url);
//     } else {
//         // Continue to other routes if we're not redirecting
//         next();
//     }
// });