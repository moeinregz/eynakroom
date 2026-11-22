import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="v-foot">
        <div className="brand"><span className="brand-mark">E</span><span><span className="brand-name">EYNAKROOM</span><span className="brand-sub">EYE ATELIER</span></span></div>
        <p>طراحی برای نگاهی متفاوت.</p>
        <p className="v-foot-links">
          <Link to="/shop">فروشگاه</Link>
          <Link to="/blog">وبلاگ</Link>
          <a href="tel:09129234145" style={{ direction: 'ltr', display: 'inline-block' }}>09129234145</a>
        </p>
        <p>© 2026 EYNAKROOM. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
