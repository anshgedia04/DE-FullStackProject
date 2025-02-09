function contactUsTemplet(name, email, message, contactNo) {
    return `
      <div style="
        font-family: 'Arial', sans-serif;
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        max-width: 600px;
        margin: 20px auto;
        border: 1px solid #ddd;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      ">
        <h2 style="
          background-color: #4CAF50;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 4px;
        ">
          Contact Us Message
        </h2>
        
        <div style="padding: 15px;">
          <p style="
            font-size: 16px;
            color: #333;
          ">
            <strong>Name:</strong> ${name}
          </p>
          
          <p style="
            font-size: 16px;
            color: #333;
          ">
            <strong>Email:</strong> ${email}
          </p>
          
          <p style="
            font-size: 16px;
            color: #333;
          ">
            <strong>Contact Number:</strong> ${contactNo}
          </p>
          
          <p style="
            font-size: 16px;
            color: #333;
            border-top: 1px solid #ddd;
            padding-top: 10px;
          ">
            <strong>Message:</strong>
          </p>
          
          <p style="
            font-size: 14px;
            background-color: #f2f2f2;
            padding: 10px;
            border-left: 4px solid #4CAF50;
            color: #555;
            line-height: 1.6;
            white-space: pre-wrap;
          ">
            ${message}
          </p>
        </div>
        
        <footer style="
          margin-top: 20px;
          font-size: 12px;
          color: #999;
          text-align: center;
        ">
          This is an automated message from the website. Please do not reply.
        </footer>
      </div>
    `;
  }
  module.exports = contactUsTemplet;