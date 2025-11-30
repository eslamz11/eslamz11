# نشر المشروع على Cloudflare Pages

هذا الدليل يشرح كيفية نشر مشروع Portfolio على Cloudflare Pages.

## المتطلبات

- حساب على [Cloudflare](https://dash.cloudflare.com/)
- Node.js 18 أو أحدث
- npm أو pnpm

## طريقة النشر

### الطريقة 1: النشر عبر Git (موصى بها)

1. **ادفع الكود إلى GitHub**
   ```bash
   git add .
   git commit -m "Configure for Cloudflare Pages"
   git push origin main
   ```

2. **اربط المستودع مع Cloudflare Pages**
   - اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - انتقل إلى "Workers & Pages"
   - اضغط على "Create application"
   - اختر "Pages" ثم "Connect to Git"
   - اختر مستودع GitHub الخاص بك
   
3. **إعدادات البناء**
   ```
   Build command: npm run build
   Build output directory: .vercel/output/static
   Root directory: /
   Environment variables:
   - NODE_VERSION: 18
   ```

4. **إضافة متغيرات البيئة**
   - في لوحة تحكم Cloudflare Pages
   - اذهب إلى Settings > Environment variables
   - أضف جميع المتغيرات من ملف `.env.example`:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
     - وأي متغيرات أخرى مطلوبة

### الطريقة 2: النشر المباشر عبر Wrangler CLI

1. **تثبيت الحزم**
   ```bash
   npm install
   ```

2. **تسجيل الدخول إلى Wrangler**
   ```bash
   npx wrangler login
   ```

3. **بناء المشروع**
   ```bash
   npm run build
   npx @cloudflare/next-on-pages
   ```

4. **نشر المشروع**
   ```bash
   npx wrangler pages deploy .vercel/output/static --project-name=portfolio
   ```

## الأوامر المتاحة

- `npm run dev` - تشغيل السيرفر المحلي للتطوير
- `npm run build` - بناء المشروع للإنتاج
- `npm run pages:build` - بناء المشروع لـ Cloudflare Pages
- `npm run pages:deploy` - بناء ونشر المشروع
- `npm run pages:dev` - تشغيل بيئة Cloudflare Pages محلياً

## ملاحظات مهمة

### 1. متغيرات البيئة
تأكد من إضافة جميع متغيرات البيئة في إعدادات Cloudflare Pages.

### 2. Firebase Configuration
المشروع يستخدم Firebase، تأكد من:
- إضافة domain الخاص بـ Cloudflare Pages إلى Authorized domains في Firebase Console
- تفعيل Authentication methods المطلوبة

### 3. API Routes
المشروع يحتوي على API routes التي ستعمل كـ Cloudflare Workers.

### 4. Images
الصور من مصادر خارجية معرفة في `next.config.js` وستعمل بشكل طبيعي.

### 5. Edge Runtime
بعض الوظائف قد تحتاج إلى تحديد edge runtime. أضف هذا في بداية ملفات API:
```javascript
export const runtime = 'edge';
```

## إعدادات إضافية

### Custom Domain
لإضافة نطاق مخصص:
1. اذهب إلى Custom domains في إعدادات المشروع
2. أضف النطاق الخاص بك
3. اتبع التعليمات لتحديث DNS records

### Redirects & Headers
يمكنك إضافة ملف `_redirects` و `_headers` في مجلد `public/` للتحكم في التوجيهات والرؤوس.

## استكشاف الأخطاء

### خطأ في البناء
- تحقق من أن Node.js version هو 18 أو أحدث
- تأكد من تثبيت جميع الحزم: `npm install`

### مشكلة في API Routes
- تأكد من إضافة `nodejs_compat` flag في wrangler.toml
- تحقق من logs في Cloudflare Dashboard

### مشاكل الصور
- تأكد من أن جميع domains مضافة في `next.config.js`
- استخدم Cloudflare Images إذا أردت تحسين أداء الصور

## الدعم

للمزيد من المعلومات:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)

