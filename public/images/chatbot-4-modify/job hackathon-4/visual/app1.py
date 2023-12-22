from flask import Flask, request, render_template
from flask_mail import Mail, Message

app = Flask(__name__)

# SMTP configuration (replace with your SMTP server details)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465  # or 587 for TLS
app.config['MAIL_USE_TLS'] = False  # Set to True for TLS
app.config['MAIL_USE_SSL'] = True  # Set to True for SSL
app.config['MAIL_USERNAME'] = 'monishpk1401@gmail.com'
app.config['MAIL_PASSWORD'] = 'nxgt abtb osze zgnv'

mail = Mail(app)

@app.route('/')
def index():
    return render_template('register.html')  # Assuming a registration form template

@app.route('/register', methods=['POST'])
def register():
    email = request.form['email']  # Fetch email from form

    # Send registration confirmation email
    msg = Message('Registration Confirmation', sender='your_email@example.com', recipients=[email])
    msg.body = 'Thank you for registering! Please confirm your email address to complete the process.'
    mail.send(msg)

    return 'Registration successful! Check your email for confirmation.'

if __name__ == '__main__':
    app.run(debug=True, port=4040)