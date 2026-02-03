import React from 'react';

const TopTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['My Feed', 'Budget Center', 'Finance', 'Time'];

  return (
    <div className="position-relative bg-dark px-3 pt-2 pb-2">
      {/* Fade masks */}
      <div className="fade-left"></div>
      <div className="fade-right"></div>

      {/* Tabs */}
      <div className="d-flex flex-nowrap gap-2 overflow-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn flex-shrink-0 text-nowrap px-4 py-1 rounded-3 fw-medium transition-all no-border-blink ${
              activeTab === tab ? 'text-primary fw-bold active-tab' : 'text-secondary inactive-tab'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .fade-left, .fade-right {
          position: absolute;
          top: 0;
          height: 100%;
          width: 30px;
          z-index: 10;
          pointer-events: none;
        }
        .fade-left {
          left: 0;
          background: linear-gradient(to right, #212529, transparent);
        }
        .fade-right {
          right: 0;
          background: linear-gradient(to left, #212529, transparent);
        }
        
        /* FIXED: No border blink */
        .no-border-blink {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .no-border-blink:focus {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        
        .inactive-tab:hover {
          background: rgba(30, 144, 255, 0.1) !important;
          color: #1e90ff !important;
          border-radius: 20px !important;
          transform: translateY(-1px);
        }
        .active-tab {
          color: #1e90ff !important;
          font-weight: 700 !important;
        }
      `}</style>
    </div>
  );
};

export default TopTabs;
