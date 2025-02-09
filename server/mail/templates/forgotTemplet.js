const forgotTemplet = (password) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 2px 5px rgba(0,0,0,0.1);">
          <h2 style="color: #2D89EF; text-align: center;">Blue Diamond</h2>
          <p style="color: #555;">Dear Valued Customer,</p>
  
          <p style="color: #555;">
            Your account password has been reset successfully. Please use the password below to access your account:
          </p>
  
          <h3 style="text-align: center; background-color: #2D89EF; color: white; padding: 10px 20px; border-radius: 6px; display: inline-block;">
            ${password}
          </h3>
  
          <p style="color: #555;">
            Please remember to change your password after logging in for better security.
          </p>
  
          <p style="color: #555;">
            Thank you for choosing Blue Diamond — your trusted source for quality diamonds.
          </p>
  
          <div style="text-align: center;">
            <a href="" style="text-decoration: none; color: #ffffff; background-color: #2D89EF; padding: 10px 20px; border-radius: 4px;">
              Visit Blue Diamond
            </a>
          </div>
  
          <p style="color: #999; font-size: 12px;">
            Blue Diamond eCommerce | All rights reserved.
          </p>
        </div>
      </div>
    `;
  };
  
  module.exports = forgotTemplet;
  