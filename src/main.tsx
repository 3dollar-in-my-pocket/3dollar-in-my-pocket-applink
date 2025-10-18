import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DynamicLink from './DynamicLink';
import Bookmark from './Bookmark';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/.well-known/*" element={null} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="*" element={<DynamicLink />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
