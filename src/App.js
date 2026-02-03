import TopTabs from './components/home/TopTabs';
import NewsCard from './components/home/NewsCard';
import BottomNav from './components/common/BottomNav'; // 👈 ADD
import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('My Feed');

  return (
    <div className="min-vh-100 d-flex flex-column">
      <TopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow-1">
        <NewsCard activeTab={activeTab} />
      </div>
      <BottomNav /> {/* 👈 ADD - Fixed bottom */}
    </div>
  );
}
