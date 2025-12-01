# ✅ حل مشكلة Build على Vercel

## المشكلة:
```
npm error notsup Unsupported platform for @next/swc-win32-x64-msvc@16.0.6
```

---

## ✅ الحل النهائي (اتبع هذه الخطوات بالضبط):

### 1️⃣ في Vercel Dashboard:

1. اذهب إلى: https://vercel.com/dashboard
2. اختر مشروعك
3. اضغط **Settings** (من القائمة العلوية)

---

### 2️⃣ غيّر Install Command:

1. في القائمة الجانبية، اختر **General**
2. انزل إلى قسم **Build & Development Settings**
3. اضغط **Override** على **Install Command**
4. ضع هذا الأمر:

```bash
npm install --no-optional
```

أو استخدم:

```bash
npm ci --no-optional --ignore-scripts
```

5. احفظ

---

### 3️⃣ أضف Environment Variable:

في **Settings** → **Environment Variables**

أضف:
```
NPM_CONFIG_OMIT = optional
```

لـ Production و Preview و Development (الثلاثة)

---

### 4️⃣ Redeploy:

1. اذهب إلى **Deployments**
2. اضغط الأيقونة ⋮ بجانب آخر deployment
3. اضغط **Redeploy**
4. تأكد من اختيار **Invalidate Cache**

---

## البديل: استخدام Node 20.9.0 المحدد

إذا لم ينجح ما سبق، جرب:

### في Settings → Environment Variables:

```
NODE_VERSION = 20.9.0
```

---

## البديل الثالث: تعديل package.json engines

غيّر في `package.json`:

من:
```json
"engines": {
  "node": ">=20.0.0",
  "npm": ">=10.0.0"
}
```

إلى:
```json
"engines": {
  "node": "20.9.0"
}
```

---

## ✅ الحل الأسرع (موصى به):

**غيّر Install Command في Vercel إلى:**
```
npm install --no-optional
```

**ثم Redeploy مع Invalidate Cache**

---

## النتيجة المتوقعة:

```
✅ Installing dependencies...
✅ Compiled successfully
✅ Collecting page data...
✅ Generating static pages
✅ Build completed successfully
```

---

## إذا فشل كل شيء:

احذف المشروع وأنشئه من جديد مع الإعدادات الصحيحة من البداية.

