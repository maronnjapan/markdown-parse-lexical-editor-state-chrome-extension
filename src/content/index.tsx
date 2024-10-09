import 'webextension-polyfill';
import 'construct-style-sheets-polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Content from './Content';

const contentRoot = document.createElement('my-extension-root');

document.body.after(contentRoot);

createRoot(contentRoot).render(
  <React.StrictMode>
    <Content originalText="" targetLang="JA" translatedText="" />
  </React.StrictMode>
);
