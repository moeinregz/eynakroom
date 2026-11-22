import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="v-foot">
        <div className="brand-name">EYNAKROOM.</div>
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
