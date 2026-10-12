export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              <span className="brand-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="7" cy="15" r="4.2" />
                  <circle cx="17" cy="15" r="4.2" />
                  <path d="M11.2 15h1.6M2.8 12.5l2.4-3M21.2 12.5l-2.4-3" />
                </svg>
              </span>
              <span className="brand-name">Eynak<span>Room</span></span>
            </div>
            <p>فروشگاه لوکس عینک؛ جایی که کیفیت اپتیکی و طراحی خاص در کنار هم قرار می‌گیرن.</p>
          </div>
          <div className="foot-col">
            <b>دسترسی سریع</b>
            <ul>
              <li><a href="/#about">درباره ما</a></li>
              <li><a href="/#services">خدمات</a></li>
              <li><a href="/shop">فروشگاه</a></li>
              <li><a href="/blog">وبلاگ</a></li>
              <li><a href="/#testimonials">نظرات مشتریان</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <b>تماس</b>
            <ul>
              <li><a href="tel:09129234145" style={{ direction: 'ltr', display: 'inline-block' }}>09129234145</a></li>
              <li><a href="/#contact">فرم رزرو وقت</a></li>
              <li><a href="#">اینستاگرام</a></li>
              <li><a href="#">تلگرام</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© تمامی حقوق برای EynakRoom محفوظ است.</span>
          <span>طراحی‌شده با ❤ برای هنر ماندگار</span>
        </div>
      </div>
    </footer>
  );
}
