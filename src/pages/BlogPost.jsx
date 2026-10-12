import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, imageUrl } from '../api/client';

function formatDate(value) {
  return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value));
}

export default function BlogPost() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    api
      .getArticle(slug)
      .then((a) => {
        setArticle(a);
        document.title = a.metaTitle || a.title;
        api
          .getArticles({ tag: a.tag })
          .then((list) => setRelated(list.filter((x) => x.id !== a.id).slice(0, 2)))
          .catch(() => setRelated([]));
      })
      .catch(() => setError('این مقاله پیدا نشد.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="light-sec" style={{ paddingTop: 150 }}>
        <div className="wrap"><p className="state-msg">در حال بارگذاری مقاله...</p></div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="light-sec" style={{ paddingTop: 150 }}>
        <div className="wrap">
          <p className="state-msg">{error || 'این مقاله پیدا نشد.'}</p>
          <div style={{ textAlign: 'center' }}>
            <Link to="/blog" className="btn btn-solid">بازگشت به وبلاگ</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero post-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link to="/">خانه</Link> / <Link to="/blog">وبلاگ</Link> / {article.title}
          </div>
          <span className="post-tag">{article.tag}</span>
          <h1>{article.title}</h1>
          <div className="post-meta">
            <span>{formatDate(article.createdAt)}</span>
            <span>{article.readTime} دقیقه مطالعه</span>
          </div>
        </div>
      </section>

      <section className="light-sec">
        <div className="wrap post-wrap">
          {article.coverImage && (
            <div className="post-cover">
              <img src={imageUrl(article.coverImage)} alt={article.title} />
            </div>
          )}

          <div className="prose" dangerouslySetInnerHTML={{ __html: article.body }} />

          <div className="post-back">
            <Link to="/blog" className="btn btn-ghost">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              بازگشت به همه مقالات
            </Link>
          </div>

          {related.length > 0 && (
            <div className="post-related">
              <h3>مقالات مرتبط</h3>
              <div className="article-grid">
                {related.map((a) => (
                  <Link key={a.id} to={`/blog/${a.slug}`} className="article-card">
                    <div className="article-cover">
                      {a.coverImage ? (
                        <img src={imageUrl(a.coverImage)} alt={a.title} />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <circle cx="8" cy="12" r="4.2" />
                        <circle cx="16" cy="12" r="4.2" />
                        <path d="M12.2 12h-0.4M2.6 9.5l2.4-3M21.4 9.5l-2.4-3" />
                        </svg>
                      )}
                    </div>
                    <div className="article-body">
                      <span className="article-tag">{a.tag}</span>
                      <h3>{a.title}</h3>
                      <p>{a.excerpt}</p>
                      <div className="article-meta">
                        <span>{formatDate(a.createdAt)}</span>
                        <span>{a.readTime} دقیقه مطالعه</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
