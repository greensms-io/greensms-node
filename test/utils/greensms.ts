import GreenSMS from '../../lib';

export const greenSMS = new GreenSMS({
  pass: process.env.GREENSMS_PASS,
  user: process.env.GREENSMS_USER,
});
