import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, imageUrl } from '../api/client';

const HERO_IMG = 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=2000&q=90';
const FALLBACK = [
  { id: 'f1', name: 'طراحی کلاسیک', category: 'CLASSIC COLLECTION', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85' },
  { id: 'f2', name: 'نگاه مدرن', category: 'MODERN COLLECTION', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85' },
  { id: 'f3', name: 'استایل مینیمال', category: 'MINIMAL COLLECTION', img: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=85' },
];

const formatPrice = (v) => new Intl.NumberFormat('fa-IR').format(v) + ' تومان';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then((list) => setProducts(Array.isArray(list) ? list : [])).catch(() => {});
  }, []);

  const featured = products.slice(0, 3);

  return (
    <>
      <section className="v-hero" id="top">
        <img src={HERO_IMG} alt="عینک آفتابی" />
        <div className="v-hero-content">
          <div className="v-tag">EYNAKROOM / EYEWEAR COLLECTION</div>
          <h1>فراتر از<br /><span>یک نگاه.</span></h1>
          <p className="v-desc">ترکیبی از ظرافت، شخصیت و طراحی مدرن. برای کسانی که متفاوت دیدن را انتخاب می‌کنند.</p>
          <Link className="v-btn" to="/shop">مشاهده کالکشن</Link>
        </div>
      </section>

      <section className="v-section" id="collection">
        <div className="v-section-head">
          <h2>منتخب کالکشن</h2>
          <p>THE ART OF SEEING DIFFERENTLY</p>
        </div>
        <div className="v-gallery">
          {(featured.length ? featured : FALLBACK).map((p) => {
            const src = p.img || (p.image ? imageUrl(p.image) : '');
            const to = featured.length ? `/product/${p.id}` : '/shop';
            return (
              <Link key={p.id} to={to} className="v-item">
                <div className="v-item-img">
                  {src ? <img src={src} alt={p.name} /> : (
                    <svg viewBox="0 0 100 60" fill="none" stroke="#A9C4C0" strokeWidth="3">
                      <circle cx="30" cy="32" r="16" /><circle cx="70" cy="32" r="16" /><path d="M46 32h8" />
                    </svg>
                  )}
                </div>
                <h3>{p.name}</h3>
                <p>{featured.length ? formatPrice(p.price) : p.category}</p>
              </Link>
            );
          })}
        </div>
        <div className="v-more"><Link className="v-btn" to="/shop">مشاهده همه محصولات</Link></div>
      </section>

      <section className="v-about" id="about">
        <img src={HERO_IMG.replace('w=2000', 'w=1200')} alt="کلوزآپ عینک" />
        <div className="v-about-content">
          <div className="v-tag">ABOUT OUR BRAND</div>
          <h2>زیبایی در جزئیات است.</h2>
          <p>ما باور داریم عینک فقط یک وسیله نیست؛ بخشی از شخصیت و سبک زندگی شماست. طراحی متفاوت، کیفیت و سادگی، هویت اصلی نگاه ما به دنیای عینک است.</p>
        </div>
      </section>
    </>
  );
}
