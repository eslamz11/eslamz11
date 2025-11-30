# متغيرات البيئة المطلوبة

## Firebase Configuration

يجب إضافة هذه المتغيرات في إعدادات Cloudflare Pages:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## EmailJS Configuration (إذا كنت تستخدمه)

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Google reCAPTCHA (إذا كنت تستخدمه)

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

## Nodemailer (للـ Contact Form)

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_TO=recipient@email.com
```

## ملاحظات

- جميع المتغيرات التي تبدأ بـ `NEXT_PUBLIC_` يمكن الوصول إليها من المتصفح
- المتغيرات الأخرى آمنة وتستخدم فقط في API routes
- تأكد من إضافة جميع المتغيرات في Cloudflare Pages Dashboard
- لا تنشر القيم الحقيقية على GitHub

