# إعداد Firebase للمشروع

## معلومات Firebase Configuration

تم إعداد المشروع مع Firebase Project: `portfolio-3dd0f`

```
API Key: AIzaSyBj6vHXGbeqPFK40vQR8CEnjoAPofyScfM
Auth Domain: portfolio-3dd0f.firebaseapp.com
Project ID: portfolio-3dd0f
Storage Bucket: portfolio-3dd0f.firebasestorage.app
Messaging Sender ID: 530466863263
App ID: 1:530466863263:web:b84470ecd1c5eb07c44aaa
```

---

## الخطوات المطلوبة في Firebase Console

### 1️⃣ تفعيل Firestore Database

1. اذهب إلى: https://console.firebase.google.com/project/portfolio-3dd0f/firestore
2. اضغط **Create database**
3. اختر **Start in production mode**
4. اختر Location: `europe-west` (أو الأقرب لك)
5. اضغط **Enable**

### 2️⃣ إعداد Firestore Security Rules

اذهب إلى **Firestore Database → Rules** وضع هذا الكود:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Messages collection - يمكن للجميع الكتابة (contact form)
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    // Personal data collection
    match /personal/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Skills collection
    match /skills/{skillId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Experience collection
    match /experience/{expId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Education collection
    match /education/{eduId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Projects collection
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Blogs collection
    match /blogs/{blogId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

اضغط **Publish**

### 3️⃣ تفعيل Authentication

1. اذهب إلى: https://console.firebase.google.com/project/portfolio-3dd0f/authentication
2. اضغط **Get started**
3. اذهب إلى تبويب **Sign-in method**
4. فعّل **Email/Password**
5. احفظ التغييرات

### 4️⃣ إنشاء أول مستخدم Admin

1. في **Authentication → Users**
2. اضغط **Add user**
3. أدخل:
   - Email: بريدك الإلكتروني
   - Password: كلمة مرور قوية
4. احفظ

### 5️⃣ إضافة Authorized Domains

1. في **Authentication → Settings**
2. انزل إلى **Authorized domains**
3. تأكد من وجود:
   - `localhost` (للتطوير المحلي)
   - `portfolio-3dd0f.firebaseapp.com` (موجود افتراضياً)
4. **بعد النشر على Cloudflare**، أضف domain الجديد (مثل: `your-portfolio.pages.dev`)

### 6️⃣ تفعيل Storage (اختياري - لرفع الصور)

1. اذهب إلى: https://console.firebase.google.com/project/portfolio-3dd0f/storage
2. اضغط **Get started**
3. اختر **Start in production mode**
4. اختر نفس Location السابق
5. **Storage Rules** (ضع هذا):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## إضافة المتغيرات في Cloudflare Pages

اذهب إلى: Cloudflare Dashboard → Workers & Pages → مشروعك → Settings → Environment variables

أضف المتغيرات التالية:

### Production & Preview (كلاهما):

```
NODE_VERSION = 20.18.0

NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyBj6vHXGbeqPFK40vQR8CEnjoAPofyScfM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = portfolio-3dd0f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = portfolio-3dd0f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = portfolio-3dd0f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 530466863263
NEXT_PUBLIC_FIREBASE_APP_ID = 1:530466863263:web:b84470ecd1c5eb07c44aaa

EMAIL_ADDRESS = your@gmail.com
GMAIL_PASSKEY = your_app_password_from_google
```

### للحصول على Gmail App Password:

1. اذهب إلى: https://myaccount.google.com/apppasswords
2. قد تحتاج لتفعيل 2-Step Verification أولاً
3. أنشئ App Password جديد
4. اختر "Mail" و "Other (Custom name)"
5. أدخل اسم: "Portfolio Contact Form"
6. انسخ الـ password (16 حرف)
7. استخدمه كقيمة لـ `GMAIL_PASSKEY`

---

## اختبار التطوير المحلي

1. تأكد من وجود ملف `.env.local` في جذر المشروع
2. شغّل المشروع:
   ```bash
   npm run dev
   ```
3. افتح: http://localhost:3000
4. جرّب Contact Form للتأكد من عمل Firebase

---

## ملاحظات أمان ⚠️

- ✅ ملف `.env.local` موجود في `.gitignore` ولن يُرفع على GitHub
- ✅ المتغيرات التي تبدأ بـ `NEXT_PUBLIC_` آمنة وتظهر في المتصفح
- ⚠️ لا تشارك `GMAIL_PASSKEY` مع أحد
- ⚠️ لا ترفع ملف `.env.local` على GitHub أبداً

---

## روابط مهمة

- Firebase Console: https://console.firebase.google.com/project/portfolio-3dd0f
- Firestore: https://console.firebase.google.com/project/portfolio-3dd0f/firestore
- Authentication: https://console.firebase.google.com/project/portfolio-3dd0f/authentication
- Storage: https://console.firebase.google.com/project/portfolio-3dd0f/storage

