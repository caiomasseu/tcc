import React, { useState } from 'react';

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      style={{
        width: isSidebarOpen ? '240px' : '60px',
        height: '100vh',
        backgroundColor: '#f1f1f1',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        transition: 'width 0.3s',
      }}
    >
      <button
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#fff',
          color: '#333',
          fontSize: '14px',
          fontWeight: 'bold',
          border: 'none',
          marginBottom: '10px',
          cursor: 'pointer',
        }}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? 'Minimizar' : 'Expandir'}
      </button>
      <ul style={{ listStyleType: 'none', padding: '0', flexGrow: 1 }}>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#333',
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            Home
          </a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#333',
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            Inbox
          </a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#333',
              fontSize: '16px',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            Mail
          </a>
        </li>
      </ul>
    </div>
  );
}
