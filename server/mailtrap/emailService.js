// utils/emailService.js
const { transporter, sender } = require("./mailtrap.config");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  createWelcomeEmailTemplate,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates");

//// Send Verification Email
module.exports.sendVerificationEmail = async (email, verificationToken) => {

	try {
		const response = await transporter.sendMail({
			from: sender,
			to: email,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});

		
	} catch (error) {
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};

// Send Welcome Email
module.exports.sendWelcomeEmail = async (email, username) => { 
	// const recipient = [{ email }];

	try {
		const response = await transporter.sendMail({
			from: sender,
			to: email,
			subject: "Welcome to UnLinked!",
			html: createWelcomeEmailTemplate(username),  
			category: "Welcome Email",
		});
		
	} catch (error) {
		console.error(`Error sending welcome email`, error);
		throw new Error(`Error sending welcome email: ${error}`);
	}
};

module.exports.sendPasswordResetEmail = async(email, resetURL)=>{
  try {
		const response = await transporter.sendMail({
			from: sender,
			to: email,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
  
}

module.exports.sendResetSuccessEmail = async(email)=>{
  try {
		const response = await transporter.sendMail({
			from: sender,
			to: email,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
  
}