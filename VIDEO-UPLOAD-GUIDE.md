# 🎬 دليل رفع الفيديو واستبدال الرابط

## ✅ تم تحويل الفيديو إلى رابط!

الآن الموقع يستخدم رابط خارجي بدلاً من ملف `fox.mp4` المحلي.

---

## 📤 خطوات رفع الفيديو:

### الخيار 1: YouTube (الأسهل والأسرع) ⭐

1. **ارفع الفيديو:**
   - اذهب: https://youtube.com/upload
   - ارفع `fox.mp4`
   - اجعله "غير مدرج" (Unlisted)

2. **احصل على رابط التضمين:**
   - اضغط "مشاركة" → "تضمين"
   - انسخ الرابط من `src="..."`
   - مثال: `https://www.youtube.com/embed/VIDEO_ID`

3. **استبدل في الكود:**
   - افتح `index.html`
   - ابحث عن: `https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/fox.mp4`
   - استبدله بـ: `https://www.youtube.com/embed/YOUR_VIDEO_ID`

---

### الخيار 2: GitHub + jsDelivr CDN (مجاني)

1. **أنشئ مستودع GitHub:**
   - اذهب: https://github.com/new
   - اسم المستودع: `pixel-store-assets`
   - اجعله عام (Public)

2. **ارفع الفيديو:**
   - اضغط "Upload files"
   - ارفع `fox.mp4`
   - اضغط "Commit changes"

3. **احصل على رابط CDN:**
   ```
   https://cdn.jsdelivr.net/gh/USERNAME/pixel-store-assets@main/fox.mp4
   ```

4. **استبدل في الكود:**
   - افتح `index.html`
   - ابحث عن: `https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/fox.mp4`
   - استبدله برابطك الحقيقي

---

### الخيار 3: Cloudinary (مجاني 25GB)

1. **سجل حساب:**
   - https://cloudinary.com/users/register/free

2. **ارفع الفيديو:**
   - اذهب لـ Media Library
   - اضغط "Upload"
   - ارفع `fox.mp4`

3. **احصل على الرابط:**
   - اضغط على الفيديو
   - انسخ "URL"
   - مثال: `https://res.cloudinary.com/YOUR_CLOUD/video/upload/fox.mp4`

4. **استبدل في الكود**

---

### الخيار 4: Internet Archive (بدون حدود)

1. **ارفع الفيديو:**
   - https://archive.org/upload
   - ارفع `fox.mp4`

2. **احصل على الرابط:**
   - بعد الرفع، اضغط على الفيديو
   - انسخ "Direct Link"

3. **استبدل في الكود**

---

## 🔧 كيفية الاستبدال في الكود:

### إذا استخدمت YouTube:
```html
<!-- استبدل هذا -->
<source src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/fox.mp4" type="video/mp4">

<!-- بهذا -->
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID" 
        class="absolute z-10 w-full h-full" 
        frameborder="0" 
        allow="autoplay; encrypted-media" 
        allowfullscreen>
</iframe>
```

### إذا استخدمت رابط مباشر (GitHub/Cloudinary/Archive):
```html
<!-- استبدل هذا -->
<source src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/fox.mp4" type="video/mp4">

<!-- بهذا -->
<source src="YOUR_VIDEO_URL_HERE" type="video/mp4">
```

---

## 📊 المقارنة:

| الخيار | السرعة | الحد | السهولة |
|--------|--------|------|---------|
| **YouTube** | ⭐⭐⭐⭐⭐ | 256GB | ⭐⭐⭐⭐⭐ |
| **GitHub+CDN** | ⭐⭐⭐⭐ | 100MB | ⭐⭐⭐⭐ |
| **Cloudinary** | ⭐⭐⭐⭐⭐ | 25GB | ⭐⭐⭐⭐ |
| **Archive.org** | ⭐⭐ | ∞ | ⭐⭐⭐ |

---

## ✅ بعد الاستبدال:

1. **احذف `fox.mp4` من المجلد**
2. **حجم المشروع سيصبح: 330 KB فقط!**
3. **ارفع الموقع على Cloudflare Pages**
4. **✅ جاهز!**

---

## 💡 التوصية:

**استخدم YouTube** - الأسرع والأسهل!
