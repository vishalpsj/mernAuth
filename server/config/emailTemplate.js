export const generateWelcomeEmail = (user) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #32CD32, #ADFF2F);
      font-family: Arial, sans-serif;
      color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #537D5D;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      color: #fff;
    }
    .content {
      padding: 30px;
      color: #333;
      background-color: #F5ECD5;
    }
    .thrill{
    font-size:25px;
    font-weight:700;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .footer {
      background-color: #537D5D;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome, ${user.name}!</h1>
    </div>
    <div class="content">
      <p class="thrill">We're thrilled to have you on board.</p>
      <p>Thanks for joining us — let’s do something great together!</p>
      <p>Your account has been successfully created using this email address: ${user.email}. Please visit your account to verify your email and complete the setup.</p>
      <p>Enjoy your experience!</p>
    </div>
    <div class="footer">
      &copy; 2025 Heltron — All rights reserved.
    </div>
  </div>
</body>
</html>
`;



export const generateEmailVerificationEmail = (user, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #32CD32, #ADFF2F);
      font-family: Arial, sans-serif;
      color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #537D5D;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      color: #fff;
    }
    .content {
      padding: 30px;
      color: #333;
      background-color: #F5ECD5;
    }
    .otp {
      font-size: 35px;
      font-weight: bold;
      background-color: #537D5D;
      color: #fff;
      padding: 10px 20px;
      border-radius: 8px;
     padding: 15px;
      text-align: center;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .footer {
      background-color: #537D5D;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification Required</h1>
    </div>
    <div class="content">
      <p>Hello ${user.name},</p>
      <p>We've received a request to verify your email address associated with this account: <strong>${user.email}</strong>.</p>
      <p>Please use the following OTP to complete the verification process:</p>
      <div class="otp">${otp}</div>
      <p>Enter this code in the verification page of your account to confirm your email.</p>
      <p>If you did not request this verification, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      &copy; 2025 Heltron — All rights reserved.
    </div>
  </div>
</body>
</html>
`;


export const generatePasswordResetEmail = (user, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #32CD32, #ADFF2F);
      font-family: Arial, sans-serif;
      color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #537D5D;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      color: #fff;
    }
    .content {
      padding: 30px;
      color: #333;
      background-color: #F5ECD5;
    }
    .otp {
      font-size: 35px;
      font-weight: bold;
      background-color: #537D5D;
      color: #fff;
      padding: 10px 20px;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .footer {
      background-color: #537D5D;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hello ${user.name},</p>
      <p>We received a request to reset the password for your account associated with this email: <strong>${user.email}</strong>.</p>
      <p>Please use the following OTP to complete the password reset process:</p>
      <div class="otp">${otp}</div>
      <p>Enter this code on the reset password page to proceed with updating your password.</p>
      <p>If you did not request a password reset, please ignore this email, and your account will remain secure.</p>
    </div>
    <div class="footer">
      &copy; 2025 Heltron — All rights reserved.
    </div>
  </div>
</body>
</html>
`;



export const generatePasswordResetSuccessEmail = (user) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset Successful</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #32CD32, #ADFF2F);
      font-family: Arial, sans-serif;
      color: #ffffff;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #537D5D;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      color: #fff;
    }
    .content {
      padding: 30px;
      color: #333;
      background-color: #F5ECD5;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .footer {
      background-color: #537D5D;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="content">
      <p>Hello ${user.name},</p>
      <p>We’re happy to inform you that your password has been successfully reset. You can now log in with your new password and enjoy full access to your account.</p>
      <p>If you did not request this reset, we suggest you change your password immediately to ensure the security of your account.</p>
      <p>Thank you for using our service!</p>
    </div>
    <div class="footer">
      &copy; 2025 Heltron — All rights reserved.
    </div>
  </div>
</body>
</html>
`;
