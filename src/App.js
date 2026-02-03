import { useState } from 'react';
import TopTabs from './components/home/TopTabs';
import NewsCard from './components/home/NewsCard';

function App() {
  const [activeTab, setActiveTab] = useState('My Feed');

  return (
    <div className="min-vh-100">
      {/* Top Tabs (UI only) */}
      <TopTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* News Feed */}
      <NewsCard activeTab={activeTab} />
    </div>
  );
}

export default App;
