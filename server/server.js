const express = require('express');
const app = express();
const config = require('./configs/app.config');

require('./configs/express.config')(app);

app.use(require('./routes'));


app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
})