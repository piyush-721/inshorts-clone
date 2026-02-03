import { useState } from 'react';

const TopTabs = () => {
  const [activeTab, setActiveTab] = useState('My Feed');
  const tabs = ['My Feed', 'Budget Center', 'Finance', 'Time'];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-dark px-4 pt-3 pb-3 position-relative">
      {/* Fade mask overlay */}
      <div className="fade-mask-left"></div>
      <div className="fade-mask-right"></div>
      
      <div className="d-flex flex-nowrap gap-3 overflow-auto hide-scrollbar scrollable-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn px-4 py-2 rounded-3 fw-medium text-nowrap flex-shrink-0 transition-all ${
              activeTab === tab ? 'active-tab' : 'inactive-tab'
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .scrollable-tabs {
          padding-right: 40px; /* Space for right fade */
        }
        
        /* Fade masks */
        .fade-mask-left,
        .fade-mask-right {
          position: absolute;
          top: 0;
          height: 100%;
          width: 30px;
          z-index: 10;
          pointer-events: none;
        }
        
        .fade-mask-left {
          left: 15px;
          background: linear-gradient(to right, rgba(33, 37, 41, 1), rgba(33, 37, 41, 0));
        }
        
        .fade-mask-right {
          right: 15px;
          background: linear-gradient(to left, rgba(33, 37, 41, 1), rgba(33, 37, 41, 0));
        }
        
        .active-tab {
          color: #1e90ff !important;
          background: transparent !important;
          border: none !important;
          font-weight: 700 !important;
        }
        
        .inactive-tab {
          color: #adb5bd !important;
          background: transparent !important;
          border: none !important;
        }
        
        .inactive-tab:hover,
        .inactive-tab:active {
          color: #1e90ff !important;
          background: rgba(30, 144, 255, 0.1) !important;
          border-radius: 20px !important;
          transform: translateY(-1px);
        }
        
        @media (min-width: 576px) {
          .d-flex.flex-nowrap {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TopTabs;
