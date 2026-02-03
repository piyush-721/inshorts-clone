import { useEffect, useRef, useState } from 'react';

const CATEGORY_MAP = {
  'My Feed': 'general',
  'Budget Center': 'business',
  'Finance': 'business',
  'Timeline': 'technology',
};

const API_KEY = '486f237f46bb4ea8a7ecf1be40805aa4';
const TOP_TABS_HEIGHT = 72;

const NewsCard = ({ activeTab }) => {
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    fetchNews();
  }, [activeTab]);

  const fetchNews = async () => {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${CATEGORY_MAP[activeTab]}&apiKey=${API_KEY}`
    );
    const data = await res.json();
    setArticles(data.articles || []);
    setIndex(0);
  };

  const timeAgo = (date) => {
    const hrs = Math.floor((Date.now() - new Date(date)) / 3600000);
    if (hrs < 1) return 'few minutes ago';
    if (hrs === 1) return '1 hour ago';
    return `${hrs} hours ago`;
  };

  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 60 && index < articles.length - 1) setIndex(index + 1);
    if (diff < -60 && index > 0) setIndex(index - 1);
  };

  const article = articles[index];
  if (!article) return null;

  return (
    <div
      className="w-100 d-flex flex-column"
      style={{ height: `calc(100vh - ${TOP_TABS_HEIGHT}px)` }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={() => window.open(article.url, '_blank')}
    >
      {/* TOP IMAGE */}
      <img
        src={article.urlToImage}
        alt=""
        className="w-100"
        style={{ height: '38%', objectFit: 'cover' }}
      />

      {/* TEXT CONTENT */}
      <div className="flex-grow-1 px-3 pt-3 d-flex flex-column">
        <h5 className="fw-bold mb-3">
          {article.title}
        </h5>

        {/* MORE DESCRIPTION SPACE */}
<p
  className="text-secondary fs-6 mb-3"
  style={{
    lineHeight: '1.6',
  }}
>
  {article.description}

  {article.content?.replace(/\[\+\d+ chars\]/, '')}
</p>



        <small className="text-muted mt-auto mb-2">
          {timeAgo(article.publishedAt)} | {article.source?.name}
        </small>
      </div>

      {/* BOTTOM ZOOMED IMAGE SECTION */}
      <div
        className="position-relative d-flex justify-content-center align-items-center text-center"
        style={{
          height: '12%',
          backgroundImage: `url(${article.urlToImage})`,
          backgroundSize: '180%',     // 👈 heavy zoom
          backgroundPosition: 'center',
        }}
      >
        {/* Fade overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        />

        {/* CENTERED TITLE */}
        <span className="position-relative text-white fw-semibold px-3">
          {article.source?.name}
        </span>
      </div>
    </div>
  );
};

export default NewsCard;
