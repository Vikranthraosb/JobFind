const nodemailer = require('nodemailer');
const registeredUsers = require('./user.js'); // Path to your user.js file

// Function to send email
async function sendEmail(subject, body, toEmail, smtpConfig) {
  try {
    // Create a Nodemailer transporter using SMTP
    let transporter = nodemailer.createTransport(smtpConfig);

    // Setup email data
    let mailOptions = {
      from: smtpConfig.auth.user,
      to: toEmail,
      subject: subject,
      text: body,
    };

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
}

// SMTP configuration
const smtpConfig = {
  host: 'your_smtp_server',
  port: 587,
  secure: false,
  auth: {
    user: 'your_email@example.com',
    pass: 'your_password',
  },
};

// Function to simulate user registration
function simulateUserRegistration(newUser) {
  // Save the newly registered user to the user.js file or your database
  // Here, let's assume you add the new user to the registeredUsers array
  registeredUsers.push(newUser);

  // Send a confirmation email to the newly registered user
  sendEmail(
    'Registration Confirmation',
    'Thank you for registering!',
    newUser.email, // Use the registered user's email for sending confirmation
    smtpConfig
  )
    .then(() => {
      console.log('Registration confirmation email sent to:', newUser.email);
    })
    .catch((error) => {
      console.error('Error sending registration confirmation email:', error);
    });
}

// Simulating a new user registration
const newUser = {
  username: 'newUser',
  email: 'newuser@example.com',
  // other details...
};

// Simulate user registration by calling the function
simulateUserRegistration(newUser);
