const express = require('express');
const nodemailer = require('nodemailer');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json());

app.use(compression());

app.use(express.static('public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rapidtaxahm@gmail.com',
      pass: '11999966'
    }
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.post('/response', (req, res) => {
    const mailOptions = {
        from: 'rapidtaxahm@gmail.com',
        to: 'rapidtaxahm@gmail.com',
        subject: 'New Response',
        html: `New Response Received <br> 
        <b>Name:</b> ${req.body.name}<br>
        <b>Email:</b> ${req.body.email}<br>
        <b>Phone:</b> ${req.body.phone}<br>
        <b>Service:</b> ${req.body.service}`
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(200).send('Error occured');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('E-mail sent');
        }
    });
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})