exports.resetPassword = (user, {token}) => ({
  from: 'exceed-team-1',
  to: user.email,
  subject: 'Welcome to the Exceed Team CRM!',
  text:
  'Welcome to the Exceed Team CRM!\n\n'
  + 'Please click on the following link, or paste this into your browser to create your password and start using CRM system:\n\n'
  + `${process.env.FRONTEND_URL}reset/?token=${token}\n\n`
  + 'Best Regards,'
  + 'Exceed Team,\n',
});
