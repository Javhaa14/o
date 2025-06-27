# Email Setup Instructions

## Gmail Configuration

To enable email notifications, you need to configure Gmail with an App Password:

### 1. Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

### 2. Generate App Password
1. Go to Google Account settings
2. Navigate to Security
3. Under "2-Step Verification", click on "App passwords"
4. Select "Mail" and "Other (Custom name)"
5. Enter a name like "Valentine App"
6. Copy the generated 16-character password

### 3. Update Environment Variables
1. Open `.env.local` file in the project root
2. Replace the placeholder values:
   ```
   EMAIL_USER=your-actual-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### 4. Important Notes
- Never commit your `.env.local` file to version control
- The app password is different from your regular Gmail password
- Make sure to use your actual Gmail address (javhaa1410@gmail.com or another address you control)

### 5. Testing
After setup, when someone submits the form:
- You'll receive a beautiful HTML email with all the date details
- The email will be sent to: javhaa1410@gmail.com
- Subject: "💕 Шинэ болзооны мэдээлэл! 💕"

### Email Content Includes:
- Date: 2025.06.27 Saturday
- Time: User selected time
- Activities: User selected activities
- Date confirmation status
- Important warnings about first date and weather 