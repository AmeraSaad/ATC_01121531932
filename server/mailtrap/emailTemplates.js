// utils/emailTemplates.js
const VERIFICATION_EMAIL_TEMPLATE = `
  <h1>Please verify your email</h1>
  <p>Your verification code is: <strong>{verificationCode}</strong></p>
  <p>This code expires in 24 hours.</p>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
  <h1>Password Reset Requested</h1>
  <p>Click <a href="{resetURL}">here</a> to reset your password.</p>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
  <h1>Password Successfully Reset</h1>
  <p>Your password was changed at {timestamp}.</p>
`;

const createWelcomeEmailTemplate = (username) => `
  <h1>Welcome, ${username}!</h1>
  <p>Thanks for verifying your email. You can now book events.</p>
`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  createWelcomeEmailTemplate,
};
