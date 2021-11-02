const express = require('express');
const app = express();
const config = require('./configs/app.config');
const cors = require('cors');

global.__basedir = __dirname;

app.use(cors());

require('./configs/express.config')(app);
require('./configs/db.config');

app.use(require('./routes'));

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
})