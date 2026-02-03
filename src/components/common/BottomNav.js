import React, { useState } from 'react';

const BottomNav = () => {
  const [activeIcon, setActiveIcon] = useState('home');

  return (
    <div className="fixed-bottom bg-dark border-top border-secondary py-2 px-3" style={{ height: '55px' }}>
      <div className="d-flex justify-content-around align-items-center h-100">
        {/* Search - Always visible */}
        <button
          className={`btn p-2 border-0 shadow-none fs-3 ${activeIcon === 'search' ? 'text-white active-icon' : 'text-light'}`}
          style={{ width: '60px', height: '50px' }}
          onClick={() => setActiveIcon('search')}
        >
          <i className={`bi ${activeIcon === 'search' ? 'bi-search' : 'bi-search'}`}></i>
        </button>

        {/* Home - Always visible */}
        <button
          className={`btn p-2 border-0 shadow-none fs-3 ${activeIcon === 'home' ? 'text-white active-icon' : 'text-light'}`}
          style={{ width: '60px', height: '50px' }}
          onClick={() => setActiveIcon('home')}
        >
          <i className={`bi ${activeIcon === 'home' ? 'bi-house-fill' : 'bi-house'}`}></i>
        </button>

        {/* Profile - Always visible */}
        <button
          className={`btn p-2 border-0 shadow-none fs-3 ${activeIcon === 'profile' ? 'text-white active-icon' : 'text-light'}`}
          style={{ width: '60px', height: '50px' }}
          onClick={() => setActiveIcon('profile')}
        >
          <i className={`bi ${activeIcon === 'profile' ? 'bi-person-fill' : 'bi-person'}`}></i>
        </button>
      </div>

      <style>{`
        .active-icon {
          text-shadow: 0 0 8px rgba(255,255,255,0.6);
        }
        .text-light {
          opacity: 0.7;
        }
        .btn:focus, .btn:active {
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
          background: transparent !important;
        }
        i {
          font-weight: 900;
          font-variation-settings: 'wght' 900;
        }
      `}</style>
    </div>
  );
};

export default BottomNav;
