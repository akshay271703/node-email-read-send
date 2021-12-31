require('dotenv').config();
const { sendMail } = require('./sendEmail');
const { readMail } = require('./readEmail');

const bootstrap = async () => {
  await sendMail();
  console.log('Now waiting for 10 seconds', new Date().toString());
  setTimeout(async () => {
    console.log('Fetching the newly send mail', new Date().toString());
    await readMail();
  }, 10000);
};

bootstrap();
