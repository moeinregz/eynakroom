import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function PublicLayout({ children }) {
  const location = useLocation();

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // reveal-on-scroll animations — observes existing .reveal/.reveal-stagger
  // elements AND keeps watching the DOM so elements that mount later (e.g.
  // after an async data fetch resolves) still get picked up and revealed.
  useEffect(() => {
    let cancelled = false;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    // Note: intentionally no "already tracked" dataset guard here. In dev,
    // React 18 StrictMode runs this effect's setup twice (setup → cleanup →
    // setup) on every mount; a dataset flag set during the first pass would
    // survive the cleanup and silently stop the second (real) observer from
    // ever observing anything — leaving every .reveal element stuck at
    // opacity:0 forever. Re-observing an element twice is harmless (the
    // callback just adds a class and unobserves), so no guard is needed.
    const track = (el) => io.observe(el);

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(track);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.('.reveal, .reveal-stagger')) track(node);
          node.querySelectorAll?.('.reveal, .reveal-stagger').forEach(track);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: if for any reason an element never gets flagged as
    // intersecting (observer disconnected mid-flight, tab was backgrounded,
    // etc.), force it visible after a short delay instead of leaving the
    // page looking blank forever.
    const fallback = setTimeout(() => {
      if (cancelled) return;
      document.querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)').forEach((el) => {
        el.classList.add('in');
      });
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      io.disconnect();
      mo.disconnect();
    };
  }, [location.pathname]);

  // custom ink cursor (desktop only)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const move = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    const onOver = (e) => {
      if (e.target.closest('a, button, .prod-card, .svc-card')) cursor.classList.add('big');
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, .prod-card, .svc-card')) cursor.classList.remove('big');
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div className="grain"></div>
      <div className="ink-cursor" id="cursor"></div>
      <Header />
      {children}
      <Footer />
    </>
  );
}
