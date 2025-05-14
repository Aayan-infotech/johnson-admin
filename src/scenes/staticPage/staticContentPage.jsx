import React, { useState } from 'react';
import StaticPageEditor from '../../components/staticContentPage/staticPageEditor';
import { Box, Container } from '@mui/material';

const StaticContentPage = () => {
  const [activePage, setActivePage] = useState('about-us');
  const pages = [
    { key: 'About Us', slug: 'about-us' },
    { key: 'Privacy Policy', slug: 'privacy-policy' },
    { key: 'Terms & Conditions', slug: 'terms-and-conditions' },
  ];

  return (
    <Container maxWidth={false}>
      <h1>Static Content Management</h1>

      <Box style={{ display: 'flex ', gap: '1rem', marginBottom: '1rem' }}>
        {pages.map((page) => (
          <button
            key={page.key}
            onClick={() => setActivePage(page.slug)}
            style={{
              padding: '8px 16px',
              backgroundColor: activePage === page.slug ? '#007BFF' : '#ccc',
              color: activePage === page.slug ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {page.key}
          </button>
        ))}
      </Box>

      <StaticPageEditor pageKey={activePage} />
    </Container>
  );
};

export default StaticContentPage;
