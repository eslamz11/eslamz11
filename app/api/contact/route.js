import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/app/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Create and configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY, 
  },
});

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
};

// HTML email template
const generateEmailTemplate = (name, email, phone, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  const { name, email, phone, message: userMessage } = payload;
  
  const mailOptions = {
    from: "Portfolio", 
    to: process.env.EMAIL_ADDRESS, 
    subject: `New Message From ${name}`, 
    text: message, 
    html: generateEmailTemplate(name, email, phone, userMessage), 
    replyTo: email, 
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return false;
  }
};

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, phone, message: userMessage } = payload;

    // Validate required fields
    if (!name || !email || !userMessage) {
      return NextResponse.json({
        success: false,
        message: 'Name, email, and message are required.',
      }, { status: 400 });
    }

    const message = `New message from ${name}\n\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\n\nMessage:\n\n${userMessage}\n\n`;

    // Save message to Firestore (Primary - Must succeed)
    let firestoreSaved = false;
    try {
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        phone: phone || null,
        message: userMessage,
        status: 'unread',
        createdAt: serverTimestamp(),
      });
      firestoreSaved = true;
      console.log('Message saved to Firestore successfully');
    } catch (firestoreError) {
      console.error('Error saving to Firestore:', firestoreError.message);
      return NextResponse.json({
        success: false,
        message: 'Failed to save message. Please try again.',
      }, { status: 500 });
    }

    // Send Telegram message (Optional - Won't block success)
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;
    
    if (token && chat_id) {
      try {
        await sendTelegramMessage(token, chat_id, message);
        console.log('Telegram notification sent');
      } catch (telegramError) {
        console.error('Telegram notification failed:', telegramError);
        // Don't fail the request if Telegram fails
      }
    } else {
      console.log('Telegram credentials not configured, skipping notification');
    }

    // Send email (Optional - Won't block success)
    if (process.env.EMAIL_ADDRESS && process.env.GMAIL_PASSKEY) {
      try {
        await sendEmail(payload, message);
        console.log('Email notification sent');
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('Email credentials not configured, skipping notification');
    }

    // Success if Firestore saved (notifications are optional)
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
};