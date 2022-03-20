# Dependencies

- Dotenv // To use environment variables
- imap // To Read Emails
- nodemailer // To Send Emails
- html-to-text // To convert html to text when reading emails

# Config Object / config.js

### SEND_MAIL_CONFIG is configuration for nodemailer

### Nodemailer is used to send emails

Nodemailer initialization -

```
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(SEND_MAIL_CONFIG);
```

#### The mail setting can be instantiated in two ways depending on type of using. If the email client is 'gmail' then use the following configuration object -

```
SEND_MAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
}
```

#### Otherwise use the following configuration

```
SEND_MAIL_CONFIG: {
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: 'SSLv3',
    },
    requireTLS: true,
    port: 465,
    debug: true,
    host: 'smtpout.secureserver.net',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },
```

#### readMail Config

```
READ_MAIL_CONFIG = {
  imap: {
    user: process.env.EMAIL, // email address
    password: process.env.PASSWORD, // password
    host: 'imap.gmail.com', // if you are using gmail service
    port: 993, // For gmail service, 465 for others
    authTimeout: 10000, // Stop retrying to read emails
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
};
```

# Applications and Usage

## Send Emails / sendEmail.js

To Start sending mails you can use nodemailer native method `.sendMail(configObject)`

The `configObject` can contain values like

`from` - 'user@test.com' // Needs to be a valid email
`to` - ['user1@test.com', 'user2@test.com'] // can be an array of emails or singular email address
`subject` - 'Hello' // Subject of the email
`text` - '' // The actual text content in the body of the email
`html` - '' // Full html of the layout you want to send. More creative work can be done by using this templating and making use of html attribute.

## Read Emails / readEmail.js

Step 1 - Create connection with the given credentials

```
const connection = await imaps.connect(READ_MAIL_CONFIG);
```

Step 2 - Using the connection object, use another chained method openBox

```
const box = await connection.openBox('INBOX'); // Can be INBOX, STARRED, SNOOZED
```

Step 3 - Select the search critera, Will be an array that contains different criteria like UNSEEN, SEEN

```
const searchCriteria = ['UNSEEN'];
```

Step 4 - Configure the fetch options that determine what you want to read from the email, This can be header, text, metadata, attachments and so on.

```
const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false,
    };
```

Step 5 - Run the imap search with the above fetch Options

```
const results = await connection.search(searchCriteria, fetchOptions);
```

The variable `results` will be an array and will contain a lot of values that might be gibbrish for you. The application desired result will be dependent upon you after you have received the results.

Each object in results will contain a special attribut `which` by which you can extract only a specific part of the whole body.

### To receive the text part of the email.

```
results.forEach((res) => {
  const text = res.parts.filter((part) => {
    return part.which === 'TEXT';
  });
  let emailHTML = text[0].body;
```

The emailHTML will be in a form of `HTML`. You need a library to parse your data into text, fot the same reason I am using html-to-text library

### Do not forget the last steo to close the connection otherwise the connection will never terminate and a timeout error will be thrown.

`connection.end()`

# Current Application logic / app.js

application on start will run async function bootstrap.

The function will

- Send an email to the user defined in the MAIL_SETTINGS
- Print `Now waiting for 10 seconds`
- Wait for 10 seconds
- Print `Fetching the newly send mail`
- Will read the last mail [ A possibility that if you have not read recent mails, then multiple email would be fetched]
- Print the data of the emails

This app is for demonstration purpose only. The actual app can have a totally different approach and absolutely different use case.
