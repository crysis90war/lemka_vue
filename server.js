const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");
const serveStatic = require("serve-static");

const app = express();

app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
        res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
        next();
    }
});

app.use(
    history({
        verbose: true,
    })
);

app.use(serveStatic(path.join(__dirname, "dist")));

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log("Listening on port: " + port);
});

// const sslRedirect = require('heroku-ssl-redirect').default
// app.use(sslRedirect())
// app.get("*", function (req, res, next) {
//     if ("https" !== req.headers["x-forwarded-proto"] && "production" === process.env.NODE_ENV) {
//         res.redirect("https://" + req.hostname + req.url);
//     } else {
//         // Continue to other routes if we're not redirecting
//         next();
//     }
// });
