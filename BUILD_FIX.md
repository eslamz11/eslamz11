# ⚠️ إصلاح مشكلة Build في Cloudflare Pages

## المشكلة الحالية:
Cloudflare Pages يستخدم `pnpm run build` بدلاً من `npm run build`

```
Executing user build command: pnpm run build
No preset version installed for command pnpm
Failed: error occurred while running build command
```

---

## ✅ الحل (خطوات إلزامية):

### 1. افتح Cloudflare Pages Dashboard

اذهب إلى:
- https://dash.cloudflare.com/
- **Workers & Pages**
- اختر مشروعك (portfolio)

### 2. غيّر Build Settings

- اضغط على **Settings** (من القائمة الجانبية)
- اضغط على **Builds & deployments**
- في قسم **Build configurations**، اضغط **Configure Production deployments**

### 3. غيّر Build command

**احذف** أي build command موجود وضع بالضبط:

```
npm run build
```

⚠️ **تأكد أنها `npm` وليس `pnpm`**

### 4. تأكد من الإعدادات الأخرى:

```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: (leave empty)
Node version: (في Environment variables)
```

### 5. احفظ التغييرات

اضغط **Save**

### 6. أعد المحاولة

- اذهب إلى **Deployments**
- اضغط **Retry deployment** على آخر deployment فاشل
- أو اضغط **Create deployment** لعمل deployment جديد

---

## إعدادات Environment Variables المطلوبة:

في **Settings** → **Environment variables**:

### Production:
```
NODE_VERSION = 20.18.0

NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyBj6vHXGbeqPFK40vQR8CEnjoAPofyScfM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = portfolio-3dd0f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = portfolio-3dd0f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = portfolio-3dd0f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 530466863263
NEXT_PUBLIC_FIREBASE_APP_ID = 1:530466863263:web:b84470ecd1c5eb07c44aaa

EMAIL_ADDRESS = your@gmail.com
GMAIL_PASSKEY = your_gmail_app_password
```

### Preview (نفس الإعدادات):
كرر نفس المتغيرات للـ Preview environment

---

## الخلاصة:

✅ **Build command يجب أن يكون بالضبط:**
```
npm run build
```

❌ **وليس:**
- `pnpm run build`
- `npm install && npm run build`
- أي أمر آخر

---

## صورة توضيحية للإعدادات الصحيحة:

```
┌─────────────────────────────────────────┐
│ Build configurations                    │
├─────────────────────────────────────────┤
│ Framework preset: Next.js               │
│ Build command: npm run build            │
│ Build output directory: .next           │
│ Root directory: (leave empty)           │
└─────────────────────────────────────────┘
```

---

بعد تغيير الإعدادات، أعد المحاولة وسيعمل بنجاح! 🎉

