const fs = require('fs');

// destination.txt will be created or overwritten by default.
fs.copyFile('./web.config', './dist/web.config', (err) => {
    if (err) throw err;
    console.log('web.config was copied to the dist folder');
});