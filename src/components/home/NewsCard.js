import { useEffect, useRef, useState } from 'react';

const CATEGORY_MAP = {
  'My Feed': 'general',
  'Budget Center': 'business',
  'Finance': 'business',
  'Time': 'technology',
};

const API_KEY = 'b075f1435c386355c1ec5c721563181f'; // MediaStack API Key
const TOP_TABS_HEIGHT = 72;

const NewsCard = ({ activeTab }) => {
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(0);
  const touchStartY = useRef(0);

  // Fetch news on tab change
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `http://api.mediastack.com/v1/news?access_key=${API_KEY}&categories=${CATEGORY_MAP[activeTab]}&languages=en&limit=10`
        );
        const data = await res.json();
        setArticles(data.data || []);
        setIndex(0);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };
    fetchNews();
  }, [activeTab]);

  const timeAgo = (date) => {
    const hrs = Math.floor((Date.now() - new Date(date)) / 3600000);
    if (hrs < 1) return 'few minutes ago';
    if (hrs === 1) return '1 hour ago';
    return `${hrs} hours ago`;
  };

  const onTouchStart = (e) => (touchStartY.current = e.touches[0].clientY);
  const onTouchEnd = (e) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 60 && index < articles.length - 1) setIndex(index + 1);
    if (diff < -60 && index > 0) setIndex(index - 1);
  };

  const article = articles[index];
  if (!article) return null;

  return (
    <div
      className="d-flex flex-column w-100"
      style={{ height: `calc(100vh - ${TOP_TABS_HEIGHT}px)` }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={() => window.open(article.url, '_blank')}
    >
      {/* Top Image */}
      <img
        src={article.image}
        alt=""
        className="w-100"
        style={{ height: '38%', objectFit: 'cover' }}
      />

      {/* Text Content */}
      <div className="flex-grow-1 px-3 pt-3 d-flex flex-column">
        <h5 className="fw-bold mb-3">{article.title}</h5>
        <p className="text-secondary mb-3" style={{ lineHeight: 1.6 }}>
          {article.description}
        </p>
        <small className="text-muted mt-auto mb-2">
          {article.published_at ? timeAgo(article.published_at) : ''} | {article.source}
        </small>
      </div>

      {/* Bottom Zoomed Image */}
      <div
        className="position-relative d-flex justify-content-center align-items-center text-center"
        style={{
          height: '12%',
          backgroundImage: `url(${article.image})`,
          backgroundSize: '180%',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        />
        <span className="position-relative text-white fw-semibold px-3">
          {article.source}
        </span>
      </div>
    </div>
  );
};

export default NewsCard;
