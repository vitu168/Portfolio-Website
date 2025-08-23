# Contact Form Email Setup Instructions

Your contact form is now ready! Here are several options to enable email functionality:

## 🚀 Option 1: PHP Backend (Recommended for local hosting)

The `send-email.php` file is already created and configured to send emails to: **langvitu081@gmail.com**

### Requirements:
- Web server with PHP support (Apache, Nginx)
- PHP mail() function enabled
- SMTP server configured on your hosting

### To test locally:
1. Install XAMPP, WAMP, or similar local server
2. Place your portfolio files in the web directory (htdocs/www)
3. Start Apache and visit `http://localhost/your-portfolio`

## 🌐 Option 2: Formspree (Free Online Service)

1. Go to [https://formspree.io/](https://formspree.io/)
2. Create a free account
3. Create a new form and get your endpoint URL
4. Update the JavaScript file:

```javascript
// In src/js/contact-form.js, replace the sendEmail method:
async sendEmail(formData) {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      _replyto: formData.email,
      _subject: `New contact from ${formData.name} - Portfolio Website`
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to send email');
  }
  
  return response.json();
}
```

## 📧 Option 3: EmailJS (Client-side email service)

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create account and set up email service
3. Create email template
4. Get your service ID, template ID, and public key
5. Add EmailJS script to your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

6. Update the JavaScript configuration in `contact-form.js`:

```javascript
// Replace the sendEmail method with:
async sendEmail(formData) {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'langvitu081@gmail.com'
  };
  
  return emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID', 
    templateParams,
    'YOUR_PUBLIC_KEY'
  );
}
```

## 🏠 Option 4: Netlify Forms (For Netlify hosting)

If you deploy to Netlify, simply add `netlify` attribute to the form:

```html
<form id="contact-form" class="contact-form" netlify>
```

## 🔧 Current Setup

The contact form currently:
- ✅ Validates all form fields (name, email, message)
- ✅ Shows loading states and animations
- ✅ Displays success/error notifications
- ✅ Includes beautiful styling and responsive design
- ✅ Logs email data to console for testing
- ✅ Has fallback success message for development

## 📱 Features Included:

### Form Validation:
- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Message: Required, minimum 10 characters
- Real-time field validation
- Error messages with animations

### User Experience:
- Loading spinner during submission
- Success/error notifications
- Form reset after successful submission
- Responsive design for all devices
- Beautiful glassmorphism styling

### Email Content:
When properly configured, emails will include:
- Professional HTML formatting
- Sender's name and email
- Message content with proper formatting
- Reply-to functionality
- Professional subject line

## 🎯 Testing

You can test the form right now! It will:
1. Validate your inputs
2. Show the loading state
3. Display a success message
4. Log the email data to browser console

Open Developer Tools (F12) to see the email data that would be sent.

## 🚀 Next Steps

1. Choose your preferred email service from the options above
2. Follow the setup instructions for your chosen method
3. Test the form with a real submission
4. Customize the email template if needed

Your contact form is now professionally styled and ready to receive messages!
