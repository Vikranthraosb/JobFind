// Fetch registered emails from the server
async function fetchRegisteredEmails() {
    try {
        const response = await fetch('/fetch-emails'); // Adjust the endpoint as needed
        const emails = await response.json();
        return emails;
    } catch (error) {
        console.error('Error fetching registered emails:', error);
        return [];
    }
}

// Send email when registering
async function register(userType) {
    const emails = await fetchRegisteredEmails();

    if (emails.length > 0) {
        const smtpConfig = {
            host: 'your_smtp_server',
            port: 587,
            secure: false,
            auth: {
                user: 'monishpk1401@gmail.com',
                pass: 'nxgt abtb osze zgnv'
            }
        };

        const subject = `Welcome to our platform, ${userType}!`;
        const body = `Thank you for registering as a ${userType}. We look forward to your engagement.`;

        // Send emails to each registered email address
        for (const email of emails) {
            await sendEmail(subject, body, email, smtpConfig);
        }

        alert('Registration successful! Check your email for confirmation.');
    } else {
        alert('No registered emails found. Unable to send confirmation.');
    }
}
