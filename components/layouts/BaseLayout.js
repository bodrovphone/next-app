import React, { Fragment } from 'react';
import Header from '../shared/Header';

export default function BaseLayout({ children, className }) {
  return (
    <div className="layout-container">
      <Header />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
}
