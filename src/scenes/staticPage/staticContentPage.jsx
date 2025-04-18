import React, { useState } from 'react';
import StaticPageEditor from '../../components/staticContentPage/staticPageEditor';

const StaticContentPage = () => {
  const [activePage, setActivePage] = useState('about-us');

  const pages = [
    { label: 'About Us', key: 'about-us' },
    { label: 'Privacy Policy', key: 'privacy-policy' },
    { label: 'Terms & Conditions', key: 'terms-and-conditions' },
  ];

  return (
    <div>
      <h1>Static Content Management</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {pages.map((page) => (
          <button
            key={page.key}
            onClick={() => setActivePage(page.key)}
            style={{
              padding: '8px 16px',
              backgroundColor: activePage === page.key ? '#007BFF' : '#ccc',
              color: activePage === page.key ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {page.label}
          </button>
        ))}
      </div>

      <StaticPageEditor pageKey={activePage} />
    </div>
  );
};

export default StaticContentPage;
