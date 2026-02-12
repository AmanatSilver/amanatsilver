# WhatsApp Business API Integration Setup

This guide explains how to set up WhatsApp Business API for the Amanat Silver contact form.

## Overview

When users submit the contact form, their message is automatically sent to your business WhatsApp number via the WhatsApp Business Cloud API.

## Current Status

✅ **Integration Complete** - Code is ready to use
⚠️ **Demo Mode** - Currently using demo credentials (messages won't be sent)

## Setup Instructions

### Step 1: Create a Meta (Facebook) Business Account

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Sign in or create an account
3. Create a **Business Account** if you don't have one

### Step 2: Create a WhatsApp Business App

1. Visit [Meta Apps Dashboard](https://developers.facebook.com/apps/)
2. Click **Create App**
3. Select **Business** as app type
4. Fill in the app details:
   - App name: "Amanat Silver Business"
   - Contact email: your business email
5. Click **Create App**

### Step 3: Add WhatsApp Product

1. In your app dashboard, find **Add Products to Your App**
2. Locate **WhatsApp** and click **Set Up**
3. Follow the WhatsApp setup wizard

### Step 4: Get Your Credentials

#### Phone Number ID
1. In WhatsApp dashboard, go to **Getting Started**
2. Find **Phone Number ID** (a long numeric string)
3. Copy this value

#### Access Token
1. In the same section, find **Temporary Access Token**
2. For **testing**: Use the temporary token
3. For **production**: Generate a permanent token:
   - Go to **System Users** in Business Settings
   - Create a system user
   - Generate a permanent token with `whatsapp_business_messaging` permission

#### Business Number
1. You can use Meta's test number for testing
2. For production, add your own business number:
   - Go to **Phone Numbers** in WhatsApp settings
   - Click **Add Phone Number**
   - Follow verification steps

### Step 5: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the demo values:

```env
# Replace these values with your actual credentials
VITE_WHATSAPP_PHONE_NUMBER_ID=123456789012345  # Your Phone Number ID
VITE_WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxx    # Your Access Token
VITE_WHATSAPP_BUSINESS_NUMBER=+918886020800    # Your business WhatsApp number
```

3. Save the file
4. Restart your development server

### Step 6: Test the Integration

1. Navigate to the Contact page of your website
2. Fill in the contact form
3. Click **Submit Enquiry**
4. Check your WhatsApp business number for the message

## Message Format

Messages sent via WhatsApp will be formatted as:

```
*New Contact Form Submission*

*Name:* John Doe
*Email:* john@example.com

*Message:*
I am interested in your silver rings collection.

_Sent via Amanat Silver Website_
```

## Troubleshooting

### Demo Mode Warning
If you see "WhatsApp integration is in demo mode", it means the credentials haven't been updated yet. Update the `.env` file with real credentials.

### Message Not Received
1. Verify the phone number ID is correct
2. Check that the access token is valid
3. Ensure the business number includes country code (+91 for India)
4. Check browser console for error messages

### API Errors
Common error codes:
- **100**: Invalid parameter - Check your phone number format
- **190**: Access token expired - Generate a new token
- **368**: Temporarily blocked - Too many requests
- **131031**: Account not approved - Complete business verification

## Security Best Practices

1. **Never commit real credentials to Git**
   - `.env` file is in `.gitignore`
   - Only commit `.env.example` with placeholder values

2. **Use permanent tokens in production**
   - Temporary tokens expire in 24 hours
   - Generate system user tokens for production

3. **Protect your access token**
   - Don't share it publicly
   - Rotate tokens periodically
   - Use environment variables only

4. **Monitor usage**
   - WhatsApp has conversation-based pricing
   - Set up billing alerts in Meta Business Manager

## Rate Limits

- **Test Numbers**: 1,000 messages per day
- **Production**: Based on your Meta Business verification tier
- **App Rate Limit**: Client-side rate limiting prevents spam (1 message per 60 seconds)

## Cost Information

- First 1,000 conversations per month: **Free**
- After that: Varies by country (India: ~$0.02-0.04 per conversation)
- A conversation = 24-hour messaging window

## Production Checklist

Before going live, ensure:

- [ ] Meta Business Account is verified
- [ ] WhatsApp Business Account is approved
- [ ] Permanent access token is generated
- [ ] Business phone number is verified
- [ ] Environment variables are set correctly
- [ ] Test messages are being received
- [ ] Rate limiting is working
- [ ] Error handling is tested

## Support Resources

- [WhatsApp Cloud API Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Meta Business Help Center](https://www.facebook.com/business/help)
- [WhatsApp Business API Pricing](https://developers.facebook.com/docs/whatsapp/pricing)

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify credentials in Meta dashboard
3. Review the error messages in the contact form
4. Contact Meta Business Support for API-related issues
