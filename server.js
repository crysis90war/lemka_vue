const express = require('express');
const history = require('connect-history-api-fallback')
const path = require('path');
const serveStatic = require('serve-static');

const app = express();

// Use a fallback for non-root routes (required for Vue router)
//   NOTE: History fallback must be "used" before the static serving middleware!
app.use(history({
    // OPTIONAL: Includes more verbose logging
    verbose: true
}))

app.use(serveStatic(path.join(path.resolve(), 'dist')));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port: ' + port);
});