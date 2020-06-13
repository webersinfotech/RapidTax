const express = require('express');
const compression = require('compression');
const app = express();

app.use(compression());

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.listen(80, () => {
    console.log('Listening on port 80');
})