import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout() {
  const { username, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isProductsActive = location.pathname === '/dashboard';
  const isArticlesActive = location.pathname.startsWith('/dashboard/articles');
  const isOrdersActive = location.pathname.startsWith('/dashboard/orders');

  return (
    <div className="dash-shell">
      <div className="dash-topbar">
        <div className="wrap">
          <Link to="/dashboard" className="brand">
            <span className="brand-mark" style={{ width: 36, height: 36 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
                <circle cx="7" cy="15" r="4.2" />
                <circle cx="17" cy="15" r="4.2" />
                <path d="M11.2 15h1.6M2.8 12.5l2.4-3M21.2 12.5l-2.4-3" />
              </svg>
            </span>
            <span className="brand-name" style={{ fontSize: '1.05rem' }}>Eynak<span>Room</span> داشبورد</span>
          </Link>
          <div className="dash-topbar-links">
            <Link to="/dashboard" className={isProductsActive ? 'active' : ''}>محصولات</Link>
            <Link to="/dashboard/orders" className={isOrdersActive ? 'active' : ''}>سفارش‌ها</Link>
            <Link to="/dashboard/articles" className={isArticlesActive ? 'active' : ''}>مقالات</Link>
            <Link to="/shop" target="_blank" rel="noreferrer">مشاهده فروشگاه</Link>
            <span style={{ opacity: 0.6, fontSize: '.85rem' }}>{username}</span>
            <button
              onClick={() => {
                logout();
                navigate('/dashboard/login');
              }}
            >
              خروج
            </button>
          </div>
        </div>
      </div>
      <div className="wrap dash-content">
        <Outlet />
      </div>
    </div>
  );
}
