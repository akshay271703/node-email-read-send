const imaps = require('imap-simple');
const { convert } = require('html-to-text');
const { READ_MAIL_CONFIG } = require('./config');

const readMail = async () => {
  try {
    const connection = await imaps.connect(READ_MAIL_CONFIG);
    console.log('CONNECTION SUCCESSFUL', new Date().toString());
    const box = await connection.openBox('INBOX');
    const searchCriteria = ['UNSEEN'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false,
    };
    const results = await connection.search(searchCriteria, fetchOptions);
    results.forEach((res) => {
      const text = res.parts.filter((part) => {
        return part.which === 'TEXT';
      });
      let emailHTML = text[0].body;
      let emailText = convert(emailHTML);
      console.log(emailText);
    });
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readMail,
};
