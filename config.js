module.exports.READ_MAIL_CONFIG = {
  imap: {
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
    host: 'imap.gmail.com',
    port: 993,
    authTimeout: 10000,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
};

module.exports.SEND_MAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
