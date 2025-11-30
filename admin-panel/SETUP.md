# دليل إعداد لوحة التحكم 🚀

## خطوات التشغيل السريع

### 1️⃣ تثبيت الحزم

```bash
cd admin-panel
npm install
```

### 2️⃣ إعداد Firebase

#### إنشاء مستخدم Admin للدخول:

**الطريقة الأولى: من Firebase Console**
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروعك `portfolio-3dd0f`
3. من القائمة الجانبية، اختر **Authentication**
4. اضغط على تبويب **Users**
5. اضغط على **Add user**
6. أدخل البريد الإلكتروني (مثال: `admin@portfolio.com`)
7. أدخل كلمة المرور (مثال: `Admin@123`)
8. اضغط **Add user**

**الطريقة الثانية: استخدام Firebase CLI**
```bash
# تسجيل الدخول لـ Firebase
firebase login

# إنشاء مستخدم
firebase auth:import users.json --project portfolio-3dd0f
```

### 3️⃣ إعداد Firestore Database

1. في Firebase Console، اذهب إلى **Firestore Database**
2. إذا لم يكن مفعّلاً، اضغط **Create database**
3. اختر **Start in test mode** (للتطوير)
4. اختر موقع قريب (مثل: `eur3` - أوروبا)

**القواعد الأمنية (Security Rules):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة للجميع
    match /{document=**} {
      allow read: if true;
    }
    
    // السماح بالكتابة للمستخدمين المصادق عليهم فقط
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

### 4️⃣ إعداد Firebase Storage

1. في Firebase Console، اذهب إلى **Storage**
2. اضغط **Get started**
3. اختر **Start in test mode**
4. انتظر حتى يتم الإنشاء

**القواعد الأمنية (Storage Rules):**
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

### 5️⃣ تشغيل المشروع

```bash
npm run dev
```

افتح المتصفح على: **http://localhost:3001**

### 6️⃣ تسجيل الدخول

استخدم البريد الإلكتروني وكلمة المرور اللذان أنشأتهما في الخطوة 2.

---

## 🎯 المجموعات (Collections) في Firestore

سيتم إنشاء هذه المجموعات تلقائياً عند إضافة أول عنصر:

### 1. `personalData`
```javascript
{
  main: {
    name: "اسمك",
    designation: "مطور ويب",
    description: "نبذة عنك...",
    email: "email@example.com",
    phone: "+966...",
    address: "المدينة، الدولة",
    github: "https://github.com/...",
    linkedin: "https://linkedin.com/in/...",
    twitter: "https://twitter.com/...",
    profileImage: "url"
  }
}
```

### 2. `projects`
```javascript
{
  title: "اسم المشروع",
  description: "وصف المشروع",
  technologies: ["React", "Node.js"],
  liveUrl: "https://...",
  githubUrl: "https://github.com/...",
  image: "url",
  createdAt: "timestamp"
}
```

### 3. `skills`
```javascript
{
  name: "React.js",
  level: 90,
  category: "frontend",
  createdAt: "timestamp"
}
```

### 4. `experiences`
```javascript
{
  title: "المسمى الوظيفي",
  company: "اسم الشركة",
  duration: "2020 - 2023",
  description: "وصف العمل",
  createdAt: "timestamp"
}
```

---

## 🔧 حل المشاكل الشائعة

### ❌ خطأ: "Firebase: Error (auth/user-not-found)"
**الحل:** تأكد من إنشاء مستخدم في Firebase Authentication

### ❌ خطأ: "Missing or insufficient permissions"
**الحل:** تحقق من قواعد Firestore و Storage

### ❌ خطأ في رفع الصور
**الحل:** 
1. تأكد من تفعيل Firebase Storage
2. تحقق من قواعد Storage Rules
3. تأكد من تسجيل الدخول

### ❌ المشروع لا يعمل
**الحل:**
```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules
npm install

# تنظيف Cache
npm cache clean --force
```

---

## 📊 بنية البيانات الموصى بها

### مثال: إضافة بيانات تجريبية

يمكنك إضافة بيانات تجريبية يدوياً من Firebase Console:

1. اذهب إلى **Firestore Database**
2. اضغط **Start collection**
3. Collection ID: `projects`
4. Document ID: **Auto-ID**
5. أضف الحقول:
   - `title` (string): "مشروع تجريبي"
   - `description` (string): "وصف المشروع"
   - `technologies` (array): ["React", "Firebase"]
   - `liveUrl` (string): "https://example.com"
   - `image` (string): "https://via.placeholder.com/400"

---

## 🎨 التخصيص

### تغيير الألوان الرئيسية

في `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#fff7ed',   // أفتح
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // الأساسي
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',  // أغمق
  },
}
```

### تغيير المنفذ (Port)

في `vite.config.js`:

```javascript
server: {
  port: 3001  // غيّر الرقم هنا
}
```

---

## 🚀 النشر (Deployment)

### Netlify

```bash
npm run build
# ارفع مجلد dist إلى Netlify
```

### Vercel

```bash
npm install -g vercel
vercel
```

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من Firebase Console للتأكد من تفعيل جميع الخدمات
2. تحقق من Console في المتصفح لرؤية الأخطاء
3. تأكد من صحة بيانات تسجيل الدخول

---

✨ **بالتوفيق!** ✨

